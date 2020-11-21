const Character = require('../../../models/character')

const countCharacters = async (_) => {
  return Character
    .countDocuments()
}

module.exports = countCharacters
