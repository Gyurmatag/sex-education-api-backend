const { ApolloError, AuthenticationError } = require('apollo-server-express')
const tokenUtil = require('../../../utils/token')
const User = require('../../../models/user')
const redis = require('../../../utils/init-redis')

const logout = async (_, { refreshToken }) => {
  try {
    const decodedRefreshToken = await tokenUtil.getDecodedRefreshToken(refreshToken)
    const user = await User.findById(decodedRefreshToken.userId)
    redis.getConnection().DEL(user.id.toString(), (error) => {
      if (error) {
        throw new ApolloError('Redis connection error')
      }
      return {
        ...user._doc,
        id: user._id
      }
    })
  } catch (error) {
    throw new AuthenticationError('Refresh token invalid')
  }
}
module.exports = logout
