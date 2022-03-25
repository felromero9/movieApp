require('dotenv').config({ path: './config/.env' });
const express = require('express');
const logger = require('./services/logger');
// express-winston provides middlewares for request and error logging
const expressLogger = require('express-winston');
const API = require('./api');

process.on('uncaughtException', err => {
  logger.error(err);
});

(async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(expressLogger.logger({
    winstonInstance: logger,
    // -> [GET] /api/search/?s=matrix -> 500 6ms {"meta":{}}
    msg: "-> [{{req.method}}] {{req.url}} -> {{res.statusCode}} {{res.responseTime}}ms",
    meta: false,
  }));

  const api = await API();
  app.use('/api', api);

  /** With express here I show what is inside public after the build */
  app.use(express.static('public'));

  try {
    app.listen(port);
    logger.info(`Listening on port: ${port}`);
  } catch (error) {
    logger.error('Error:', error.message || error.reason);
  }
})();
