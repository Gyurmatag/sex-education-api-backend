const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const http = require('http')
const context = require('./utils/context')
const schema = require('./modules')
const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema,
  context: async ({ req }) => ({
    user: await context.getUser(req)
  })
})
const app = express()
server.applyMiddleware({
  path: '/',
  app
})
const httpServer = http.createServer(app)
// server.installSubscriptionHandlers(httpServer)
module.exports = httpServer
