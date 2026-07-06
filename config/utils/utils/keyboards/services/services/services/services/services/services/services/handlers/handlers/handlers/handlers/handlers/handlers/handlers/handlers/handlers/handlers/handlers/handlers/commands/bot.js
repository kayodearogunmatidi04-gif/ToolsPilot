const { Telegraf, session } = require('telegraf');
const rateLimit = require('telegraf-ratelimit');
const config = require('./config');
const logger = require('./utils/logger');
const { mainMenu } = require('./keyboards/inline');

// Handlers
const startHandler = require('./handlers/start');
const helpHandler = require('./handlers/help');
const aboutHandler = require('./handlers/about');
const toolsHandler = require('./handlers/tools');
const passwordHandler = require('./handlers/password');
const qrHandler = require('./handlers/qr');
const textHandler = require('./handlers/text');
const randomHandler = require('./handlers/random');
const uuidHandler = require('./handlers/uuid');
const base64Handler = require('./handlers/base64');
const hashHandler = require('./handlers/hash');
const counterHandler = require('./handlers/counter');

// Register commands
const registerCommands = require('./commands');

// Init bot
const bot = new Telegraf(config.BOT_TOKEN);
const limiter = rateLimit({
  window: 1000,
  limit: 5,
  onLimitExceeded: (ctx) => ctx.reply('⏳ Please slow down.'),
});

bot.use(session());
bot.use(limiter);
bot.use((ctx, next) => {
  ctx.session = ctx.session || {};
  return next();
});

// Register commands
registerCommands(bot);

// --- Handlers ---

// /start
bot.command('start', startHandler);

// /help
bot.command('help', helpHandler);

// /about
bot.command('about', aboutHandler);

// /tools
bot.command('tools', toolsHandler);

// /password
bot.command('password', (ctx) => passwordHandler.show(ctx));

// /qr
bot.command('qr', (ctx) => qrHandler.show(ctx));

// /text
bot.command('text', (ctx) => textHandler.show(ctx));

// /random
bot.command('random', (ctx) => randomHandler.show(ctx));

// /uuid
bot.command('uuid', (ctx) => uuidHandler.show(ctx));

// /base64
bot.command('base64', (ctx) => base64Handler.show(ctx));

// /hash
bot.command('hash', (ctx) => hashHandler.show(ctx));

// /counter
bot.command('counter', (ctx) => counterHandler.show(ctx));

// --- Callback queries ---

bot.action('main_menu', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.editMessageText('👋 Main menu:', mainMenu());
});

bot.action('text_tools', (ctx) => textHandler.show(ctx));
bot.action('password_gen', (ctx) => passwordHandler.show(ctx));
bot.action('qr_gen', (ctx) => qrHandler.show(ctx));
bot.action('random_gen', (ctx) => randomHandler.show(ctx));
bot.action('uuid_gen', (ctx) => uuidHandler.show(ctx));
bot.action('base64_tools', (ctx) => base64Handler.show(ctx));
bot.action('hash_gen', (ctx) => hashHandler.show(ctx));
bot.action('word_counter', (ctx) => counterHandler.show(ctx));
bot.action('help', (ctx) => helpHandler(ctx));
bot.action('about', (ctx) => aboutHandler(ctx));

// Password callbacks
bot.action(/pass_.+/, (ctx) => passwordHandler.handle(ctx));

// Text tools callbacks
bot.action(/text_/, (ctx) => textHandler.selectOperation(ctx));

// Random callbacks
bot.action(/random_/, (ctx) => randomHandler.handle(ctx));

// Base64 callbacks
bot.action(/base64_/, (ctx) => base64Handler.selectOperation(ctx));

// Hash callbacks
bot.action(/hash_/, (ctx) => hashHandler.selectAlgorithm(ctx));

// Cancel actions (for multi-step)
bot.action('cancel', (ctx) => {
  const type = ctx.session.qrWaiting ? 'qr' :
               ctx.session.textWaiting ? 'text' :
               ctx.session.base64Waiting ? 'base64' :
               ctx.session.hashWaiting ? 'hash' :
               ctx.session.counterWaiting ? 'counter' : null;
  if (type) {
    // call respective cancel
    switch (type) {
      case 'qr': return qrHandler.cancel(ctx);
      case 'text': return textHandler.cancel(ctx);
      case 'base64': return base64Handler.cancel(ctx);
      case 'hash': return hashHandler.cancel(ctx);
      case 'counter': return counterHandler.cancel(ctx);
      default: return ctx.reply('Cancelled.');
    }
  }
  ctx.reply('Cancelled.', mainMenu());
});

// --- Text message handling (for stateful inputs) ---

bot.on('text', async (ctx) => {
  // Check if we are waiting for QR text
  if (ctx.session.qrWaiting) {
    return qrHandler.processText(ctx);
  }
  if (ctx.session.textWaiting && ctx.session.textOperation) {
    return textHandler.processText(ctx);
  }
  if (ctx.session.base64Waiting && ctx.session.base64Operation) {
    return base64Handler.processText(ctx);
  }
  if (ctx.session.hashWaiting && ctx.session.hashAlgorithm) {
    return hashHandler.processText(ctx);
  }
  if (ctx.session.counterWaiting) {
    return counterHandler.processText(ctx);
  }
  // Default: reply with main menu
  await ctx.reply('Please choose an option from the menu.', mainMenu());
});

// --- Error handling ---

bot.catch((err, ctx) => {
  logger.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply('⚠️ An unexpected error occurred. Please try again later.');
});

// --- Start bot ---

bot.launch()
  .then(() => logger.info('Bot started'))
  .catch(err => logger.error('Bot launch error:', err));

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
