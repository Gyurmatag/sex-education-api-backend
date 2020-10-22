const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum : ['MALE','FEMALE'],
        required: true
    },
    seasons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Season',
            required: true
        }
    ]
})

const Character = mongoose.model('Character', characterSchema)
module.exports = Character
