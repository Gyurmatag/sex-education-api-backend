const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    me: User @isAuthenticated
  }
  
  extend type Mutation {
    login(
      email: String!,
      password: String!
    ): AuthData
    signup(
      email: String!,
      username: String!,
      password: String!
    ): User
  }
  type AuthData {
    user: User
    token: String!
    tokenExpiration: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
