const { ApolloError } = require('apollo-server-express')
const Episode = require('../../../models/episode')

const createEpisode = async (_, {
  number,
  title,
  director,
  writer,
  season
}) => {
  const newEpisode = new Episode({
    number,
    title,
    director,
    writer,
    season
  })

  await newEpisode.populate('season').execPopulate()

  if (!newEpisode.season) {
    throw new ApolloError('Not found')
  }

  return newEpisode.save()
}

module.exports = createEpisode
