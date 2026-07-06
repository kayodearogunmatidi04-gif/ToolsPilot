const encode = (text) => Buffer.from(text, 'utf8').toString('base64');
const decode = (text) => Buffer.from(text, 'base64').toString('utf8');

module.exports = { encode, decode };
