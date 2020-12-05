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
      this.client = redis.createClient(this.url.port, this.url.hostname, { no_ready_check: true })
      if (process.env.NODE_ENV !== 'development') {
        this.client.auth(this.url.toString().split('default:')[1].split('@')[0]
        )
      }
      this.connected = true
      return this.client
    }
  }
}

module.exports = new Redis()
