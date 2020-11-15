const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    character(id: ID!): Character
    characters(skip: Int, limit: Int): [Character]
  }
  
   extend type Mutation {
    createCharacter(
      name: String!
      gender: String!
      imageUrl: String!
      seasons: [ID]!
    ): Character @isAuthenticated
  }
  
  type Character {
      id: ID!
      name: String!
      gender: String!
      imageUrl: String!
      seasons: [Season]!
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
