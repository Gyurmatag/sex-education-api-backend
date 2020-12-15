const pubsub = require('../../../utils/init-pubsub')

const quoteCreated = {
  subscribe: () => pubsub.asyncIterator(['QUOTE_CREATED'])
}

module.exports = quoteCreated
