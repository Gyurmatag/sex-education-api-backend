const Character = require('../../../models/character')

const characters = async (_, { skip, limit }) => {
  return Character
    .find().skip(skip).limit(limit).populate('seasons')
}

module.exports = characters
