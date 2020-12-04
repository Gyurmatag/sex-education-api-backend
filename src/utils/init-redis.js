const redis = require('redis')
class Redis {
  constructor () {
    this.url = process.env.NODE_ENV === 'development' ? new URL(process.env.REDIS_URL) : new URL(process.env.REDISCLOUD_URL)
    this.connected = false
    this.client = null
  }

  getConnection () {
    if (this.connected) {
      return this.client
    } else {
      const redisURL = this.url
      this.client = redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true })
      this.connected = true
      return this.client
    }
  }
}

module.exports = new Redis()
