const Character = require('../../../models/character')
const characters = async (_, { skip, limit, characterFilters }) => {
  const charactersQuery = {}
  if (characterFilters?.name) {
    charactersQuery.name = { $regex: new RegExp(characterFilters.name, 'i') }
  }
  return Character
    .find(charactersQuery).skip(skip).limit(limit).populate('seasons')
}

module.exports = characters
