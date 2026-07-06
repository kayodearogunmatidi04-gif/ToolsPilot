const crypto = require('crypto');
const config = require('../config');

const generatePassword = (length, options = {}) => {
  const { includeSymbols = true, includeNumbers = true, includeUppercase = true } = options;
  let chars = 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) chars += '0123456789';
  if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (chars.length === 0) chars = 'abcdefghijklmnopqrstuvwxyz'; // fallback

  let password = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    password += chars[bytes[i] % chars.length];
  }
  return password;
};

const validateLength = (length) => {
  const num = parseInt(length, 10);
  if (isNaN(num)) return false;
  return num >= config.MIN_LENGTH && num <= config.MAX_LENGTH;
};

module.exports = { generatePassword, validateLength };
