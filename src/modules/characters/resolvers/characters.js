const Character = require('../../../models/character')

const characters = async (_) => {
    return Character
        .find().populate('seasons');
}

module.exports = characters
