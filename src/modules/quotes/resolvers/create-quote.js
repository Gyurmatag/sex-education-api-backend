const { ApolloError } = require('apollo-server-express')
const pubsub = require('../../../utils/init-pubsub')
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

  await newQuote.save()

  await pubsub.publish('QUOTE_CREATED', { quoteCreated: newQuote })

  return newQuote
}

module.exports = createQuote
