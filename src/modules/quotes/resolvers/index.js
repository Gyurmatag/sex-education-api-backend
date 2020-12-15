const quotes = require('./quotes')
const createQuote = require('./create-quote')
const quoteCreated = require('./quote-created')

const resolvers = {
  Query: {
    quotes
  },
  Mutation: {
    createQuote
  },
  Subscription: {
    quoteCreated
  }
}

module.exports = resolvers
