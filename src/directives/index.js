const isAuthenticated = require('./is-authenticated')
const isAuthorized = require('./is-authorized')

module.exports = {
  typeDefs: [
    isAuthenticated.typeDef,
    isAuthorized.typeDef
  ],
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive,
    isAuthorized: isAuthorized.directive
  }
}
