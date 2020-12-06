const { AuthenticationError } = require('apollo-server-express')
const tokenUtil = require('../../../utils/token')
const User = require('../../../models/user')
const config = require('../../../config')
const refreshAccessToken = async (_, { availableRefreshToken }) => {
  try {
    const decodedRefreshToken = await tokenUtil.getDecodedRefreshToken(availableRefreshToken)
    const user = await User.findById(decodedRefreshToken.userId)
    const accessToken = await tokenUtil.createAccessToken(user._id)
    const refreshToken = await tokenUtil.createRefreshToken(user._id)
    return {
      user,
      accessToken,
      refreshToken,
      accessTokenExpiration: config.ACCESS_JWT_LIFE_TIME,
      refreshTokenExpiration: config.REFRESH_JWT_LIFE_TIME
    }
  } catch (error) {
    throw new AuthenticationError('Refresh token invalid')
  }
}
module.exports = refreshAccessToken
