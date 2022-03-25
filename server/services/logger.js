const winston = require('winston');
require('winston-daily-rotate-file');
const { splat, simple, combine, json } = winston.format;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: combine(
        splat(),
        simple()
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: './logs/app-log-%DATE%.log', // Create a separate folder
      datePattern: 'YYYY-MM-DD-HH',
      format: json(),
    }),
  ],
});

module.exports = logger;