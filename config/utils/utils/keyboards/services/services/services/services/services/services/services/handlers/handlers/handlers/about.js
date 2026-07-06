const { mainMenu } = require('../keyboards/inline');

module.exports = async (ctx) => {
  const about = `⭐ *ToolPilot* – v1.0\n\n` +
                `Built with Node.js, Telegraf, and ❤️.\n` +
                `Open‑source and ready for your ideas.\n\n` +
                `🔗 [GitHub Repository](https://github.com/yourusername/toolpilot-bot)`;

  await ctx.replyWithMarkdown(about, mainMenu());
};
