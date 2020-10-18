const Episode = require('../../../models/episode')

const episodes = async (_) => {
  return await Episode
    .find()
}

module.exports = episodes
