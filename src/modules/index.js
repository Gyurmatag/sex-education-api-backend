const { makeExecutableSchemaFromModules } = require('../utils/modules')
const auth = require('./auth')
const episodes = require('./episodes')
const seasons = require('./seasons')
module.exports = makeExecutableSchemaFromModules({
  modules: [
    auth,
    episodes,
    seasons
  ]
})
