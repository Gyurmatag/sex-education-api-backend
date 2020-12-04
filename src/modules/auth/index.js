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
    refreshAccessToken(
      refreshToken: String!
    ): AuthData
    logout(
      refreshToken: String!
    ): User
  }

  enum Role {
    USER
    ADMIN
  }
  
  type AuthData {
    user: User
    accessToken: String!
    accessTokenExpiration: String!
    refreshToken: String!
    refreshTokenExpiration: String!
  }
  
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    role: Role!
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
