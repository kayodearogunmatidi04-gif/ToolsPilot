const countWords = (text) => {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  return words.length;
};

const countChars = (text) => text.length;

const countCharsNoSpace = (text) => text.replace(/\s/g, '').length;

const countParagraphs = (text) => text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

const readingTime = (text, wpm = 200) => {
  const words = countWords(text);
  const minutes = Math.ceil(words / wpm);
  return minutes;
};

module.exports = { countWords, countChars, countCharsNoSpace, countParagraphs, readingTime };
