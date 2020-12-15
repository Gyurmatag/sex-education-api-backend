const Quote = require('../../../models/quote')

const quotes = async (_, { skip, limit }) => {
  return Quote
    .find().skip(skip).limit(limit).populate('character')
}

module.exports = quotes
