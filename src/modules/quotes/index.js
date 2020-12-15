const { gql } = require('apollo-server-express')
const typeDefs = gql`
  extend type Query {
    quotes(skip: Int, limit: Int): [Quote]
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
  
  type Quote {
      id: ID!
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
