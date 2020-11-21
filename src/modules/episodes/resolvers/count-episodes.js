const Episode = require('../../../models/episode')

const episodes = async (_) => {
  return Episode
    .countDocuments()
}

module.exports = episodes
