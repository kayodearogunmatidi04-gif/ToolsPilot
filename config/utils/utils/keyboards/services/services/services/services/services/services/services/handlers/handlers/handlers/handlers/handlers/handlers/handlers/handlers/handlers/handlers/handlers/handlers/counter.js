const { cancelButton, mainMenu } = require('../keyboards/inline');
const { countWords, countChars, countCharsNoSpace, countParagraphs, readingTime } = require('../services/counter');

module.exports = {
  show: async (ctx) => {
    ctx.session.counterWaiting = true;
    await ctx.replyWithMarkdown('📊 *Word Counter*\n\nSend me a text and I’ll count stats.', cancelButton());
  },

  processText: async (ctx) => {
    const text = ctx.message.text;
    const words = countWords(text);
    const chars = countChars(text);
    const charsNoSpace = countCharsNoSpace(text);
    const paragraphs = countParagraphs(text);
    const time = readingTime(text);

    const stats = `📊 *Statistics*\n\n` +
                  `📝 Words: ${words}\n` +
                  `🔤 Characters: ${chars}\n` +
                  `🚫 Characters (no spaces): ${charsNoSpace}\n` +
                  `📄 Paragraphs: ${paragraphs}\n` +
                  `⏱️ Estimated reading time: ${time} min`;

    await ctx.replyWithMarkdown(stats);
    ctx.session.counterWaiting = false;
    await ctx.replyWithMarkdown('Count another text or choose a tool:', mainMenu());
  },

  cancel: (ctx) => {
    ctx.session.counterWaiting = false;
    return ctx.replyWithMarkdown('Cancelled.', mainMenu());
  }
};
