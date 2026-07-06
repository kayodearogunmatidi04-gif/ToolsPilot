const { base64Menu, cancelButton } = require('../keyboards/inline');
const { encode, decode } = require('../services/base64');

module.exports = {
  show: async (ctx) => {
    ctx.session.base64Waiting = true;
    ctx.session.base64Operation = null;
    await ctx.replyWithMarkdown('🔤 *Base64 Tools*\nChoose operation:', base64Menu());
  },

  selectOperation: async (ctx) => {
    const op = ctx.callbackQuery.data.replace('base64_', '');
    ctx.session.base64Operation = op;
    ctx.session.base64Waiting = true;
    await ctx.editMessageText(`✏️ Send the text to ${op}.`, cancelButton());
    await ctx.answerCbQuery();
  },

  processText: async (ctx) => {
    const text = ctx.message.text;
    const op = ctx.session.base64Operation;
    if (!op) {
      return ctx.replyWithMarkdown('Please select an operation first.', base64Menu());
    }
    let result;
    try {
      result = op === 'encode' ? encode(text) : decode(text);
    } catch (err) {
      return ctx.reply('❌ Invalid input for Base64 decode. Please check the text.');
    }
    await ctx.replyWithMarkdown(`✅ *Result:*\n\`\`\`\n${result}\n\`\`\``);
    ctx.session.base64Waiting = false;
    ctx.session.base64Operation = null;
    await ctx.replyWithMarkdown('Choose another Base64 tool:', base64Menu());
  },

  cancel: (ctx) => {
    ctx.session.base64Waiting = false;
    ctx.session.base64Operation = null;
    const { mainMenu } = require('../keyboards/inline');
    return ctx.replyWithMarkdown('Cancelled.', mainMenu());
  }
};
