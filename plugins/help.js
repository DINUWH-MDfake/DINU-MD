// plugins/help.js
module.exports = {
  name: 'help',
  description: 'Lists all available commands',
  execute: async (sock, msg) => {
    const sender = msg.key.remoteJid;
    const helpMessage = `
Available Commands:
1. *ping* - Responds with "Pong!"
2. *version* - Fetches Baileys version
3. *help* - Lists all available commands
    `;
    await sock.sendMessage(sender, { text: helpMessage });
  },
};
