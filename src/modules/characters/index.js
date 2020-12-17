const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    character(id: ID!): Character
    characters(skip: Int, limit: Int, characterFilters: CharacterFilters): [Character]
  }
  
   extend type Mutation {
    createCharacter(
      name: String!
      gender: String!
      imageUrl: String!
      seasons: [ID]!
    ): Character @isAuthorized(roles: [ADMIN]) @isAuthenticated
  }
  
  enum Gender {
      MALE
      FEMALE
  }
  
  type Character {
      id: ID!
      name: String!
      gender: Gender!
      imageUrl: String!
      seasons: [Season]!
  }
  
  input CharacterFilters {
      name: String
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
