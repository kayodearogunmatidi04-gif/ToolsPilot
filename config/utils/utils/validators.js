const isSafeText = (text) => {
  // Basic sanitization
  return typeof text === 'string' && text.length < 10000;
};

const sanitizeInput = (text) => {
  return text.replace(/[^\w\s\-.,!?@]/g, '').trim();
};

module.exports = { isSafeText, sanitizeInput };
