const sendError = require('./services/utilityFunctions');
const Keys = require('./services/settings');

const express = require('express');
const logger = require('./services/logger');
const UsersDbClient = require('./services/usersDbClient');
const AuthHelper = require('./services/auth');
const OMDbClient = require('./services/omdbClient');

const API = (async () => {
  const api = express();
  const users = new UsersDbClient();
  const authHelper = new AuthHelper(users, Keys.api.config.SECRET_KEY);

  const omdbClient = new OMDbClient();
  /** Connect to cache */
  await omdbClient.connect();

  api.post('/login', async (req, res) => {
    const auth = authHelper.getAuth(req.headers.authorization);

    if (auth.type !== Keys.api.AuthTypes.BASIC) {
      logger.info('API login:Invalid authorization');
      return sendError(res, 400, 'Invalid authorization');
    }

    if (await authHelper.verify(auth)) {
      const token = await authHelper.getToken(auth);
      return res.json({ success: true, token });
    }

    logger.info(`API login: Invalid authorization`);
    return res.status(400).json({ success: false });
  });

  /** The authHelper.useAuth verifies that the user sent the correct token.*/
  api.get('/search', authHelper.useAuth(), async (req, res) => {
    /** Add parameters according documentation */
    const query = req.query.s;
    const type = req.query.t;
    const year = req.query.y;

    logger.info(`-> API: Searching for: ${JSON.stringify({ query, type, year })}`);

    try {
      const searchResult = await omdbClient.search({ query, type, year });

      if (searchResult.results) {
        logger.info(`-> API: Found ${searchResult.results.length} results`);
      } else {
        logger.info(`-> API: No results found`);
      }
      res.json(searchResult);
    } catch (error) {
      logger.error('Api search: Error:' + error || error.reason);
      sendError(res, 500, error.message || error.reason);
    }
  });

  return api;
});

module.exports = API;