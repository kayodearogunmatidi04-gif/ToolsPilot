const { Markup } = require('telegraf');

const mainMenu = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('📝 Text Tools', 'text_tools')],
    [Markup.button.callback('🔐 Password Generator', 'password_gen')],
    [Markup.button.callback('📷 QR Generator', 'qr_gen')],
    [Markup.button.callback('🔢 Random Generator', 'random_gen')],
    [Markup.button.callback('🆔 UUID Generator', 'uuid_gen')],
    [Markup.button.callback('🔤 Base64 Tools', 'base64_tools')],
    [Markup.button.callback('🔒 Hash Generator', 'hash_gen')],
    [Markup.button.callback('📊 Word Counter', 'word_counter')],
    [Markup.button.callback('ℹ️ Help', 'help'), Markup.button.callback('⭐ About', 'about')],
  ]);
};

const backButton = (callback = 'main_menu') => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🔙 Back', callback)]
  ]);
};

const cancelButton = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('❌ Cancel', 'main_menu')]
  ]);
};

// Password options keyboard
const passwordOptions = (length, includeSymbols, includeNumbers, includeUppercase) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('➖', `pass_len_dec`),
      Markup.button.callback(`${length}`, `pass_len_show`),
      Markup.button.callback('➕', `pass_len_inc`)
    ],
    [
      Markup.button.callback(`${includeSymbols ? '✅' : '❌'} Symbols`, `pass_toggle_symbols`),
      Markup.button.callback(`${includeNumbers ? '✅' : '❌'} Numbers`, `pass_toggle_numbers`),
    ],
    [
      Markup.button.callback(`${includeUppercase ? '✅' : '❌'} Uppercase`, `pass_toggle_uppercase`),
    ],
    [Markup.button.callback('⚡ Generate', `pass_generate`)],
    [Markup.button.callback('🔙 Back', 'main_menu')]
  ]);
};

// Text tools submenu
const textToolsMenu = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🔠 Uppercase', 'text_uppercase')],
    [Markup.button.callback('🔡 Lowercase', 'text_lowercase')],
    [Markup.button.callback('📝 Title Case', 'text_titlecase')],
    [Markup.button.callback('📄 Sentence Case', 'text_sentencecase')],
    [Markup.button.callback('🧹 Remove Extra Spaces', 'text_removespaces')],
    [Markup.button.callback('🔄 Reverse Text', 'text_reverse')],
    [Markup.button.callback('🔙 Back', 'main_menu')]
  ]);
};

const randomMenu = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🔢 Random Number', 'random_number')],
    [Markup.button.callback('🔐 Random Password', 'random_password')],
    [Markup.button.callback('🔢 Random PIN', 'random_pin')],
    [Markup.button.callback('🎨 Random Color Hex', 'random_color')],
    [Markup.button.callback('🔙 Back', 'main_menu')]
  ]);
};

const base64Menu = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🔐 Encode', 'base64_encode')],
    [Markup.button.callback('🔓 Decode', 'base64_decode')],
    [Markup.button.callback('🔙 Back', 'main_menu')]
  ]);
};

const hashMenu = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('MD5', 'hash_md5')],
    [Markup.button.callback('SHA1', 'hash_sha1')],
    [Markup.button.callback('SHA256', 'hash_sha256')],
    [Markup.button.callback('🔙 Back', 'main_menu')]
  ]);
};

module.exports = {
  mainMenu,
  backButton,
  cancelButton,
  passwordOptions,
  textToolsMenu,
  randomMenu,
  base64Menu,
  hashMenu,
};
