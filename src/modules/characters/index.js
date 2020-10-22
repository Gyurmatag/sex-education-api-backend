const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    character(id: ID!): Character
    characters: [Character]
  }
  
   extend type Mutation {
    createCharacter(
      name: String!
      gender: String!
      seasons: [ID]!
    ): Character @isAuthenticated
  }
  
  type Character {
      id: ID!
      name: String!
      gender: String!
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
