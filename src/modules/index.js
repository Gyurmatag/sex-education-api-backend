const { makeExecutableSchemaFromModules } = require('../utils/modules')
const auth = require('./auth')
const episodes = require('./episodes')
module.exports = makeExecutableSchemaFromModules({
  modules: [
    auth,
    episodes
  ]
})
