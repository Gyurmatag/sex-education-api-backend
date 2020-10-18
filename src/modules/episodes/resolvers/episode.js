const { ApolloError } = require('apollo-server-express')
const Episode = require('../../../models/episode')

const episode = async (_, args) => {
  const { id } = args
  const episode = await Episode
    .findById(id)

  if (!episode) {
    throw new ApolloError('Not found')
  }

  return episode
}

module.exports = episode
