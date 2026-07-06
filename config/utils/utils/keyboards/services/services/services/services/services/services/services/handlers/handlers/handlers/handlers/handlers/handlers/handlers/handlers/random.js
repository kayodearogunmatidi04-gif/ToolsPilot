const { randomMenu, cancelButton, mainMenu } = require('../keyboards/inline');
const { randomNumber, randomPIN, randomColorHex, randomPassword } = require('../services/random');

module.exports = {
  show: async (ctx) => {
    await ctx.replyWithMarkdown('🎲 *Random Generator* – choose what to generate:', randomMenu());
  },

  handle: async (ctx) => {
    const { data } = ctx.callbackQuery;
    let result = '';
    switch (data) {
      case 'random_number':
        result = `🔢 Random number (1‑100): ${randomNumber()}`;
        break;
      case 'random_password':
        result = `🔐 Random password: \`${randomPassword()}\``;
        break;
      case 'random_pin':
        result = `🔢 Random PIN: \`${randomPIN()}\``;
        break;
      case 'random_color':
        result = `🎨 Random color hex: \`${randomColorHex()}\``;
        break;
      default:
        return ctx.answerCbQuery('Unknown option');
    }
    await ctx.answerCbQuery('✅ Generated!');
    await ctx.replyWithMarkdown(result);
    // Keep menu after result
    await ctx.replyWithMarkdown('Generate another:', randomMenu());
  }
};
