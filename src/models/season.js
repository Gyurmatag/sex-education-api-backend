const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  }
})
const Season = mongoose.model('Season', seasonSchema)
module.exports = Season
