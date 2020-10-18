const episode = require('./episode')
const episodes = require('./episodes')
const createEpisode = require('./create-episode')

const resolvers = {
  Query: {
    episode,
    episodes
  },
  Mutation: {
    createEpisode
  }
}

module.exports = resolvers
