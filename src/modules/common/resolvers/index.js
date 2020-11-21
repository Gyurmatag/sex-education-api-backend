const countCharacters = require('../../characters/resolvers/count-characters')
const countEpisodes = require('../../episodes/resolvers/count-episodes')
const countSeasons = require('../../seasons/resolvers/count-seasons')

const countDocuments = () => {
  const charactersCount = countCharacters()
  const episodesCount = countEpisodes()
  const seasonsCount = countSeasons()

  return {
    charactersCount,
    episodesCount,
    seasonsCount
  }
}

const resolvers = {
  Query: {
    countDocuments
  }
}

module.exports = resolvers
