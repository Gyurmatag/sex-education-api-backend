const { AuthenticationError } = require('apollo-server-express')
const tokenUtil = require('../../../utils/token')
const User = require('../../../models/user')
const bcrypt = require('bcrypt')
const config = require('../../../config')
const login = async (_, { email, password }) => {
  const user = await User.findOne({
    email
  })
  if (!user) {
    throw new AuthenticationError('User not found')
  }
  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)
  if (!isPasswordValid) {
    throw new AuthenticationError('Incorrect password')
  }
  const accessToken = tokenUtil.createAccessToken(user._id)
  const refreshToken = tokenUtil.createRefreshToken(user._id)
  return {
    user: {
      ...user._doc,
      id: user._id
    },
    accessToken,
    accessTokenExpiration: config.ACCESS_JWT_LIFE_TIME,
    refreshToken,
    refreshTokenExpiration: config.REFRESH_JWT_LIFE_TIME
  }
}
module.exports = login
