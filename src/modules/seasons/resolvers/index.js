const season = require('./season')
const seasons = require('./seasons')
const createSeason = require('./create-season')

const resolvers = {
  Query: {
    season,
    seasons
  },
  Mutation: {
    createSeason
  }
}

module.exports = resolvers
