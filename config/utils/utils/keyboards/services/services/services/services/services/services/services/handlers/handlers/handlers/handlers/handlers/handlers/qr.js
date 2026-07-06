const { cancelButton } = require('../keyboards/inline');
const { generateQR } = require('../services/qr');

module.exports = {
  // Show prompt for text
  show: async (ctx) => {
    ctx.session.qrWaiting = true;
    await ctx.replyWithMarkdown('📷 *QR Generator*\n\nPlease send me the text you want to encode.', cancelButton());
  },

  // Process incoming text message when waiting
  processText: async (ctx) => {
    const text = ctx.message.text.trim();
    if (!text) {
      return ctx.reply('Please send a non‑empty text.');
    }
    try {
      const buffer = await generateQR(text);
      await ctx.replyWithPhoto({ source: buffer });
      ctx.session.qrWaiting = false;
      // Send main menu
      const { mainMenu } = require('../keyboards/inline');
      await ctx.replyWithMarkdown('✅ QR generated! Choose another tool.', mainMenu());
    } catch (err) {
      ctx.reply('❌ Failed to generate QR. Please try again.');
      ctx.session.qrWaiting = false;
    }
  },

  // Cancel
  cancel: (ctx) => {
    ctx.session.qrWaiting = false;
    const { mainMenu } = require('../keyboards/inline');
    return ctx.replyWithMarkdown('Cancelled.', mainMenu());
  }
};
