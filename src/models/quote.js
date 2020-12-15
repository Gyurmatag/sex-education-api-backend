const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  character: {
    type: Schema.Types.ObjectId,
    ref: 'Character',
    required: true
  }
})
const Quote = mongoose.model('Quote', quoteSchema)
module.exports = Quote
