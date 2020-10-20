const Episode = require('../../../models/episode')

const episodes = async (_) => {
  return Episode
      .find().populate('season');
}

module.exports = episodes
