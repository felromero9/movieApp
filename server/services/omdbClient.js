const Keys = require('./settings');
const axios = require('axios').default;
const logger = require('./logger');

class OMDbClient {
  constructor() {
    this.baseUrl = Keys.settings.omdbClient.BASE_URL;
  }

  async connect() {
    const RedisClient = require('./redisClient');
    this.redis = new RedisClient();
    await this.redis.connect();
    logger.info('Redis Client: connected.');
  }

  async search({ query, year, type }) {
    const requestKey = JSON.stringify({ query, year, type });
    const cached = await this.redis.get(requestKey);

    if (cached) {
      logger.info(`-> OMDbClient: Found response for ${requestKey} in cache`);
      return JSON.parse(cached);
    }

    logger.info(`-> OMDbClient: no cache found for ${requestKey} !`);

    const response = await axios.get(this.baseUrl, {
      params: {
        apikey: Keys.settings.omdbClient.API_KEY,
        s: query,
        y: year,
        type,
      },
    });

    if (response.status === 200) {
      const obj = {
        results: response.data['Search'],
        totalCount: response.data['totalResults'],
      };

      /** Store response in the cache */
      this.redis.set(requestKey, JSON.stringify(obj));
      return obj;
    } else {
      throw new Error(response.data);
    }
  }
}

module.exports = OMDbClient;