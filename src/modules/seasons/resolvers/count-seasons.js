const Season = require('../../../models/season')

const countSeasons = async (_) => {
  return Season
    .countDocuments()
}

module.exports = countSeasons
