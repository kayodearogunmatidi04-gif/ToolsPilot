const crypto = require('crypto');

const hash = (text, algorithm) => {
  return crypto.createHash(algorithm).update(text).digest('hex');
};

module.exports = { hash };
