const Keys = {
  settings: {
    redis: {
      URL: process.env.RedisConnectionString || 'redis://localhost:6379',
      TTL: process.env.RedisTTL || 120, // Time to live
    },
    omdbClient: {
      API_KEY: process.env.OMDbKey,
      BASE_URL: 'http://www.omdbapi.com/',
    },
  },
  api: {
    AuthTypes: {
      BASIC: 'Basic',
      BEARER: 'Bearer',
      UNKNOWN: 'Unknown',
    },
    config: {
      SECRET_KEY: process.env.SecretKey || '',
    },
  },

};


module.exports = Keys;