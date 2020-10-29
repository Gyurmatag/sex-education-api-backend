const character = require('./character')
const characters = require('./characters')
const createCharacter = require('./create-character')

const resolvers = {
  Query: {
    character,
    characters
  },
  Mutation: {
    createCharacter
  }
}

module.exports = resolvers
