const tokenUtil = require('./token')
const User = require('../models/user')
const TOKEN_HEADER_NAME = 'x-access-token'
const getUser = async req => {
  if (!req) {
    return null
  }
  const tokenHeader = req.get(TOKEN_HEADER_NAME)
  if (!tokenHeader) {
    return null
  }
  try {
    const decodedAccessToken = await tokenUtil.getDecodedAccessToken(tokenHeader)
    return await User.findById(decodedAccessToken.userId)
  } catch (error) {
    return null
  }
}
module.exports = {
  getUser
}
