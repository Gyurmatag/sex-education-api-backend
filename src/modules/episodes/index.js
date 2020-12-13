const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    episode(id: ID!): Episode
    episodes(skip: Int, limit: Int): [Episode]
  }
  
   extend type Mutation {
    createEpisode(
      number: Int!
      title: String!
      director: String!
      writer: String!
      season: ID!
    ): Episode @isAuthorized(roles: [ADMIN]) @isAuthenticated
  }
  
  type Episode {
    id: ID!
    number: Int!
    title: String!
    director: String!
    writer: String!
    season: Season!
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
