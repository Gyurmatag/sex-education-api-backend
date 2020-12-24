const mongoose = require('mongoose')
const MongoPaging = require('mongo-cursor-pagination')
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
quoteSchema.plugin(MongoPaging.mongoosePlugin)
const Quote = mongoose.model('Quote', quoteSchema)
module.exports = Quote
