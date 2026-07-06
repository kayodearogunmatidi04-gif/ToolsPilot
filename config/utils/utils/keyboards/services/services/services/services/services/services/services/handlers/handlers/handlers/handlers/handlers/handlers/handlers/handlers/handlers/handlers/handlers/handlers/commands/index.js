module.exports = async (bot) => {
  await bot.telegram.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Help & usage' },
    { command: 'tools', description: 'Show tools menu' },
    { command: 'password', description: 'Password generator' },
    { command: 'qr', description: 'QR generator' },
    { command: 'text', description: 'Text tools' },
    { command: 'random', description: 'Random generator' },
    { command: 'uuid', description: 'Generate UUID' },
    { command: 'base64', description: 'Base64 tools' },
    { command: 'hash', description: 'Hash generator' },
    { command: 'counter', description: 'Word counter' },
    { command: 'about', description: 'About ToolPilot' }
  ]);
};
