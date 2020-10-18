const mongoose = require('mongoose')
const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  writer: {
    type: String,
    required: true
  }
})
const Episode = mongoose.model('Episode', episodeSchema)
module.exports = Episode
