const { mainMenu } = require('../keyboards/inline');

module.exports = async (ctx) => {
  await ctx.replyWithMarkdown('🔧 *Choose a tool*', mainMenu());
};
