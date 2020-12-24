const Quote = require('../../../models/quote')

const quotes = async (_, { limit }) => {
  return Quote.paginate({ limit: limit })
}

module.exports = quotes
