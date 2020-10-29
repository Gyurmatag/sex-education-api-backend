const { ApolloError } = require('apollo-server-express')
const Character = require('../../../models/character')

const createCharacter = async (_, {
  name,
  gender,
  seasons
}) => {
  const newCharacter = new Character({
    name,
    gender,
    seasons
  })

  await newCharacter.populate('seasons').execPopulate()

  if (!newCharacter.seasons.length) {
    throw new ApolloError('Not found')
  }

  return newCharacter.save()
}

module.exports = createCharacter
