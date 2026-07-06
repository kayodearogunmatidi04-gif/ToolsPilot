const { mainMenu } = require('../keyboards/inline');

module.exports = async (ctx) => {
  const helpText = `📖 *How to use ToolPilot*\n\n` +
                   `Use the inline keyboard to select any tool.\n` +
                   `• Some tools ask for input – just type your text.\n` +
                   `• You can always press *Cancel* to return to the main menu.\n` +
                   `• Commands: /start, /help, /about, /tools, etc.\n\n` +
                   `🚀 Enjoy!`;

  await ctx.replyWithMarkdown(helpText, mainMenu());
};
