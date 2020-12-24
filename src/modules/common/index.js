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
  
  type PaginatedItems {
    previous: String!
    hasPrevious: Boolean!
    next: String!
    hasNext: Boolean!    
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
