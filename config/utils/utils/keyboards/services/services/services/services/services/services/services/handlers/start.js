const { mainMenu } = require('../keyboards/inline');

module.exports = async (ctx) => {
  const welcome = `👋 Welcome to *ToolPilot*!\n\n` +
                  `I'm your all‑in‑one utility bot. Choose a tool from the menu below.`;

  await ctx.replyWithMarkdown(welcome, mainMenu());
};
