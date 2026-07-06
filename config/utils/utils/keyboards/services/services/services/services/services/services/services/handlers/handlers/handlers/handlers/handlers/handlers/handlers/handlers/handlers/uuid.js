const { generateUUID } = require('../services/uuid');
const { mainMenu } = require('../keyboards/inline');

module.exports = {
  show: async (ctx) => {
    const uuid = generateUUID();
    await ctx.replyWithMarkdown(`🆔 *Your UUID v4:*\n\`${uuid}\``, mainMenu());
  }
};
