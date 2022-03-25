const Keys = require('./settings');
const logger = require('./logger');
const { createClient } = require('redis');

class RedisClient {
  async connect() {
    try {
      this.client = createClient({ url: Keys.settings.redis.URL });
      this.client.on('error', error => {
        logger.error('Redis Client: Error:' + error.message || error.reason);
      });

      await this.client.connect();
    } catch (error) {
      logger.error('Redis Client:' + error.message || error.reason);
    }
  }

  async set(key, value) {
    await this.client.set(key, value, { EX: Keys.settings.redis.TTL });
  }

  async get(key) {
    return await this.client.get(key);
  }
}

module.exports = RedisClient;