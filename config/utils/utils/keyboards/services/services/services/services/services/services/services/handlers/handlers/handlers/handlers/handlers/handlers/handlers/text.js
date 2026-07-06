const { textToolsMenu, cancelButton } = require('../keyboards/inline');
const { transformText } = require('../services/text');

module.exports = {
  show: async (ctx) => {
    ctx.session.textWaiting = true;
    ctx.session.textOperation = null;
    await ctx.replyWithMarkdown('📝 *Text Tools*\nChoose an operation:', textToolsMenu());
  },

  // Called when a text tool is selected from the submenu
  selectOperation: async (ctx) => {
    const op = ctx.callbackQuery.data.replace('text_', '');
    ctx.session.textOperation = op;
    ctx.session.textWaiting = true;
    await ctx.editMessageText('✏️ Please send me the text to transform.', cancelButton());
    await ctx.answerCbQuery();
  },

  // Process incoming text
  processText: async (ctx) => {
    const text = ctx.message.text;
    const op = ctx.session.textOperation;
    if (!op) {
      // if no operation selected, show menu again
      return ctx.replyWithMarkdown('Please select an operation first.', textToolsMenu());
    }
    const result = transformText(text, op);
    await ctx.replyWithMarkdown(`✅ *Result:*\n\`\`\`\n${result}\n\`\`\``);
    ctx.session.textWaiting = false;
    ctx.session.textOperation = null;
    // Show tools menu again
    await ctx.replyWithMarkdown('Choose another text tool:', textToolsMenu());
  },

  cancel: (ctx) => {
    ctx.session.textWaiting = false;
    ctx.session.textOperation = null;
    const { mainMenu } = require('../keyboards/inline');
    return ctx.replyWithMarkdown('Cancelled.', mainMenu());
  }
};
