const QRCode = require('qrcode');

const generateQR = async (text) => {
  try {
    return await QRCode.toBuffer(text);
  } catch (err) {
    throw new Error('Failed to generate QR code');
  }
};

module.exports = { generateQR };
