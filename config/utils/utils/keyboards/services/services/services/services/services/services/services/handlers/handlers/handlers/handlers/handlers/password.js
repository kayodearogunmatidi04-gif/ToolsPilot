const { passwordOptions } = require('../keyboards/inline');
const { generatePassword, validateLength } = require('../services/password');
const config = require('../config');

// Initialize session defaults
const initPassState = () => ({
  length: config.DEFAULT_LENGTH,
  includeSymbols: true,
  includeNumbers: true,
  includeUppercase: true,
});

module.exports = {
  // Called when user clicks "Password Generator"
  show: async (ctx) => {
    ctx.session.password = ctx.session.password || initPassState();
    const state = ctx.session.password;
    await ctx.replyWithMarkdown(
      `🔐 *Password Generator*\n\nLength: ${state.length}\n` +
      `Symbols: ${state.includeSymbols ? '✅' : '❌'}\n` +
      `Numbers: ${state.includeNumbers ? '✅' : '❌'}\n` +
      `Uppercase: ${state.includeUppercase ? '✅' : '❌'}\n\n` +
      `Adjust options and press *Generate*.`,
      passwordOptions(state.length, state.includeSymbols, state.includeNumbers, state.includeUppercase)
    );
  },

  // Callback actions
  handle: async (ctx) => {
    const { data } = ctx.callbackQuery;
    ctx.session.password = ctx.session.password || initPassState();
    const state = ctx.session.password;

    switch (data) {
      case 'pass_len_inc':
        if (state.length < config.MAX_LENGTH) state.length++;
        break;
      case 'pass_len_dec':
        if (state.length > config.MIN_LENGTH) state.length--;
        break;
      case 'pass_toggle_symbols':
        state.includeSymbols = !state.includeSymbols;
        break;
      case 'pass_toggle_numbers':
        state.includeNumbers = !state.includeNumbers;
        break;
      case 'pass_toggle_uppercase':
        state.includeUppercase = !state.includeUppercase;
        break;
      case 'pass_generate': {
        const password = generatePassword(state.length, {
          includeSymbols: state.includeSymbols,
          includeNumbers: state.includeNumbers,
          includeUppercase: state.includeUppercase,
        });
        await ctx.answerCbQuery('✅ Generated!');
        await ctx.replyWithMarkdown(`🔑 \`${password}\``);
        // Show the options again
        return ctx.editMessageReplyMarkup(
          passwordOptions(state.length, state.includeSymbols, state.includeNumbers, state.includeUppercase).reply_markup
        );
      }
      default:
        return ctx.answerCbQuery('Invalid action');
    }

    // Update the message with new options
    await ctx.editMessageReplyMarkup(
      passwordOptions(state.length, state.includeSymbols, state.includeNumbers, state.includeUppercase).reply_markup
    );
    await ctx.answerCbQuery('Settings updated');
  }
};
