const Season = require('../../../models/season')

const seasons = async (_) => {
    return await Season
        .find()
}

module.exports = seasons
