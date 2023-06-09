const mongoose = require('mongoose')
const config = require('./src/config')
const getMongo = ({
  mongoUrl,
  connectionWhitelist
}) => {
  if (mongoose.connection.host) {
    throw new Error(`There was already a mongoose connection, this is dangerous. Was connected to: ${mongoose.connection.host}`)
  }
  let hasConnected = false
  const connect = async () => {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      promiseLibrary: global.Promise
    })
    hasConnected = true
    // eslint-disable-next-line no-console
    console.log(`Connected to test database at ${mongoUrl}`)
  }
  const drop = async () => {
    if (!hasConnected) {
      throw new Error('Was trying to drop the database, but was not connected to the test database.')
    }
    if (!connectionWhitelist.includes(mongoose.connection.client.s.url)) {
      throw new Error('Was trying to a non-whitelisted database, cancelled.')
    }
    await mongoose.connection.db.dropDatabase()
    // eslint-disable-next-line no-console
    console.log('Dropped the test database')
  }
  const close = async () => {
    // eslint-disable-next-line no-console
    console.log('Closing mongoose connection')
    if (!mongoose.connection) {
      throw new Error('Could not close the connection, there was none.')
    }
    if (!hasConnected) {
      throw new Error(`Wanted to close connection to: ${mongoose.connection.host}, but was not connected to url: ${mongoUrl}`)
    }
    await Promise.all(mongoose.modelNames().map(model => {
      return mongoose.model(model).ensureIndexes()
    }))
    await mongoose.disconnect()
    hasConnected = false
    // eslint-disable-next-line no-console
    console.log('Connection to mongoose closed')
  }
  return {
    connect,
    drop,
    close
  }
}
const mongo = getMongo({
  mongoUrl: config.MONGODB_TEST_URI,
  connectionWhitelist: [
    config.MONGODB_TEST_URI
  ]
})
global.before(async () => {
  if (process.env.NODE_ENV !== 'mocha') {
    throw new Error('NODE_ENV should be set to "mocha".')
  }
  await mongo.connect()
  await mongo.drop()
})
global.after(async () => {
  await mongo.close()
})
