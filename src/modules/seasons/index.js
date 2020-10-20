const { gql } = require('apollo-server-express')
const typeDefs = gql`
    extend type Query {
        season(id: ID!): Season
        seasons: [Season]
    }

    extend type Mutation {
        createSeason(
            number: Int!
            releaseDate: DateTime!
        ): Season @isAuthenticated
    }

    type Season {
        id: ID!
        number: Int!
        releaseDate: DateTime!
    }
`
const resolvers = require('./resolvers')
module.exports = {
    typeDefs: [
        typeDefs
    ],
    resolvers
}
