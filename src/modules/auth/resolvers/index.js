const me = require('./me')
const login = require('./login')
const signup = require('./signup')
const refreshAccessToken = require('./refresh-access-token')
const logout = require('./logout')
const resolvers = {
  Query: {
    me
  },
  Mutation: {
    login,
    signup,
    refreshAccessToken,
    logout
  }
}
module.exports = resolvers
