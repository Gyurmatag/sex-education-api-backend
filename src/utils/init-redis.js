const redis = require('redis')
class Redis {
  constructor () {
    this.url = process.env.REDIS_URL
    this.connected = false
    this.client = null
  }

  getConnection () {
    if (this.connected) {
      return this.client
    } else {
      this.client = redis.createClient(this.url)
      this.connected = true
      return this.client
    }
  }
}

module.exports = new Redis()
