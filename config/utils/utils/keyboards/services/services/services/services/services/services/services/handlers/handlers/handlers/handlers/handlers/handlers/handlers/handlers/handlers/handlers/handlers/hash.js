const { hashMenu, cancelButton } = require('../keyboards/inline');
const { hash } = require('../services/hash');

module.exports = {
  show: async (ctx) => {
    ctx.session.hashWaiting = true;
    ctx.session.hashAlgorithm = null;
    await ctx.replyWithMarkdown('🔒 *Hash Generator*\nChoose algorithm:', hashMenu());
  },

  selectAlgorithm: async (ctx) => {
    const algo = ctx.callbackQuery.data.replace('hash_', '');
    ctx.session.hashAlgorithm = algo;
    ctx.session.hashWaiting = true;
    await ctx.editMessageText(`✏️ Send the text to hash with *${algo}*.`, cancelButton());
    await ctx.answerCbQuery();
  },

  processText: async (ctx) => {
    const text = ctx.message.text;
    const algo = ctx.session.hashAlgorithm;
    if (!algo) {
      return ctx.replyWithMarkdown('Please select an algorithm first.', hashMenu());
    }
    const result = hash(text, algo);
    await ctx.replyWithMarkdown(`✅ *${algo} hash:*\n\`${result}\``);
    ctx.session.hashWaiting = false;
    ctx.session.hashAlgorithm = null;
    await ctx.replyWithMarkdown('Hash another text:', hashMenu());
  },

  cancel: (ctx) => {
    ctx.session.hashWaiting = false;
    ctx.session.hashAlgorithm = null;
    const { mainMenu } = require('../keyboards/inline');
    return ctx.replyWithMarkdown('Cancelled.', mainMenu());
  }
};
