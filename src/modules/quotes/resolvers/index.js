const quotes = require('./quotes')
const createQuote = require('./create-quote')

const resolvers = {
  Query: {
    quotes
  },
  Mutation: {
    createQuote
  }
}

module.exports = resolvers
