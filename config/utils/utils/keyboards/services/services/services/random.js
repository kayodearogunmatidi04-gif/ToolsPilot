const crypto = require('crypto');
const { generatePassword } = require('./password');

const randomNumber = (min = 1, max = 100) => {
  const range = max - min + 1;
  const bytes = crypto.randomBytes(4);
  const random = bytes.readUInt32BE(0) / 0xFFFFFFFF;
  return Math.floor(random * range) + min;
};

const randomPIN = (length = 4) => {
  let pin = '';
  for (let i = 0; i < length; i++) {
    pin += crypto.randomBytes(1)[0] % 10;
  }
  return pin;
};

const randomColorHex = () => {
  const color = crypto.randomBytes(3).toString('hex');
  return `#${color}`;
};

const randomPassword = (length = 12) => generatePassword(length, { includeSymbols: true, includeNumbers: true, includeUppercase: true });

module.exports = { randomNumber, randomPIN, randomColorHex, randomPassword };
