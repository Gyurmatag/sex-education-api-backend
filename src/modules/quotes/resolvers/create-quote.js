const { ApolloError } = require('apollo-server-express')
const Quote = require('../../../models/quote')

const createQuote = async (_, {
  text,
  character
}) => {
  const newQuote = new Quote({
    text,
    character
  })

  await newQuote.populate('character').execPopulate()

  if (!newQuote.character) {
    throw new ApolloError('Character not found')
  }

  return newQuote.save()
}

module.exports = createQuote
