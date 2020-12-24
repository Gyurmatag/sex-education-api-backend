const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    quotes(limit: Int): PaginatedItems
  }
  
   extend type Mutation {
    createQuote(
      text: String!
      character: ID!
    ): Quote @isAuthenticated
  }
  
  extend type Subscription {
    quoteCreated: Quote
  }

  extend type PaginatedItems {
    results: [Quote]!
  }
  
  type Quote {
    _id: ID!
    text: String!
    character: Character!
  }
`
const resolvers = require('./resolvers')
module.exports = {
  typeDefs: [
    typeDefs
  ],
  resolvers
}
