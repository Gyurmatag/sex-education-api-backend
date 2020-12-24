const Quote = require('../../../models/quote')

const quotes = async (_, { limit, next }) => {
  return Quote.paginate({ limit: limit, next: next })
}

module.exports = quotes
