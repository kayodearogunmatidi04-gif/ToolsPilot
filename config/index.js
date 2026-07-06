const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEFAULT_LENGTH: 12,
  MAX_LENGTH: 64,
  MIN_LENGTH: 4,
};
