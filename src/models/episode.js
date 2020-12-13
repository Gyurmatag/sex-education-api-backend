const mongoose = require('mongoose')
const Schema = mongoose.Schema

const episodeSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
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
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: 'Season',
    required: true
  }
})
const Episode = mongoose.model('Episode', episodeSchema)
module.exports = Episode
