const ms = require('ms')
const jwt = require('jsonwebtoken')
const config = require('../config')
const redis = require('../utils/init-redis')
const createAccessToken = userId => new Promise((resolve, reject) => {
  jwt.sign({
    userId
  }, config.ACCESS_JWT_SECRET, {
    expiresIn: config.ACCESS_JWT_LIFE_TIME
  }, (error, accesstoken) => {
    if (error) {
      return reject(error)
    }
    resolve(accesstoken)
  })
})
const getDecodedAccessToken = accessToken => new Promise((resolve, reject) => {
  jwt.verify(accessToken, config.ACCESS_JWT_SECRET, (error, decodedAccessToken) => {
    if (error) {
      return reject(error)
    }
    if (!decodedAccessToken.exp || !decodedAccessToken.iat) {
      return reject(new Error('Access Token had no \'exp\' or \'iat\' payload'))
    }
    resolve(decodedAccessToken)
  })
})
const createRefreshToken = userId => new Promise((resolve, reject) => {
  jwt.sign({
    userId
  }, config.REFRESH_JWT_SECRET, {
    expiresIn: config.REFRESH_JWT_LIFE_TIME
  }, (error, refreshToken) => {
    if (error) {
      return reject(error)
    }
    redis.getConnection().SET(userId.toString(), refreshToken, 'EX', ms(config.REFRESH_JWT_LIFE_TIME), (error) => {
      if (error) {
        return reject(error)
      }
      resolve(refreshToken)
    })
  })
})
const getDecodedRefreshToken = refreshToken => new Promise((resolve, reject) => {
  jwt.verify(refreshToken, config.REFRESH_JWT_SECRET, (error, decodedRefreshToken) => {
    if (error) {
      return reject(error)
    }
    if (!decodedRefreshToken.exp || !decodedRefreshToken.iat) {
      return reject(new Error('Refresh Token had no \'exp\' or \'iat\' payload'))
    }
    const userId = decodedRefreshToken.userId
    redis.getConnection().GET(userId, (err, result) => {
      if (err) {
        return reject(new Error('Redis error'))
      }
      if (refreshToken !== result) {
        return reject(new Error('Refresh token error'))
      }
      resolve(decodedRefreshToken)
    })
  })
})
module.exports = {
  createAccessToken,
  getDecodedAccessToken,
  createRefreshToken,
  getDecodedRefreshToken
}
