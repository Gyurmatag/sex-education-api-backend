const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    episode(id: ID!): Episode
    episodes: [Episode]
  }
  
   extend type Mutation {
    createEpisode(
      title: String!
      director: String!
      writer: String!
    ): Episode @isAuthenticated
  }
  
  type Episode {
    id: ID!
    title: String!
    director: String!
    writer: String!
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
