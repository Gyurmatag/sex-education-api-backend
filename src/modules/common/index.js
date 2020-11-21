const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    countDocuments: DocumentsCount
  }
  
  type DocumentsCount {
      charactersCount: Int!
      episodesCount: Int!
      seasonsCount: Int!
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
