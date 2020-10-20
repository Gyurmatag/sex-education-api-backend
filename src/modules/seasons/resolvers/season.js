const { ApolloError } = require('apollo-server-express')
const Season = require('../../../models/season')

const season = async (_, args) => {
    const { id } = args
    const season = await Season
        .findById(id)

    if (!season) {
        throw new ApolloError('Not found')
    }

    return season
}

module.exports = season
