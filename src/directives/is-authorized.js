const { gql, SchemaDirectiveVisitor, ForbiddenError } = require('apollo-server-express')
const { defaultFieldResolver, DirectiveLocation, GraphQLDirective, GraphQLList } = require('graphql')
const typeDef = gql`
    directive @isAuthorized(roles: [Role!]) on FIELD_DEFINITION
`
class IsAuthorizedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration (directiveName, schema) {
    return new GraphQLDirective({
      name: 'isAuthorized',
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        roles: {
          type: new GraphQLList(schema.getType('Role'))
        }
      }
    })
  }

  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    const roles = this.args.roles
    field.resolve = async function (...args) {
      const context = args[2]
      const userRoles = context.user.role

      if (roles.some(role => userRoles.indexOf(role) === -1)) {
        throw new ForbiddenError('Not authorized')
      }
      return resolve.apply(this, args)
    }
  }
}
module.exports = {
  typeDef,
  directive: IsAuthorizedDirective
}
