const { ApolloError } = require('apollo-server-express')
const Character = require('../../../models/character')

const character = async (_, args) => {
    const { id } = args
    const character = await Character
        .findById(id).populate('seasons')

    if (!character) {
        throw new ApolloError('Not found')
    }

    return character
}

module.exports = character
