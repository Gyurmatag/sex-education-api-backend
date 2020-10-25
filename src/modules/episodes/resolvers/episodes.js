const Episode = require('../../../models/episode')

const episodes = async (_, {skip, limit}) => {
  return Episode
      .find().skip(skip).limit(limit).populate('season');
}

module.exports = episodes
