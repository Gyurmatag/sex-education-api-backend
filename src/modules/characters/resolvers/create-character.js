const { ApolloError } = require('apollo-server-express')
const Character = require('../../../models/character')

const createCharacter = async (_, {
  name,
  gender,
  imageUrl,
  seasons
}) => {
  const newCharacter = new Character({
    name,
    gender,
    imageUrl,
    seasons
  })

  await newCharacter.populate('seasons').execPopulate()

  if (!newCharacter.seasons.length) {
    throw new ApolloError('Not found')
  }

  return newCharacter.save()
}

module.exports = createCharacter
