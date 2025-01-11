// plugins/version.js
const { fetchLatestBaileysVersion } = require('@adiwajshing/baileys');

module.exports = {
  name: 'version',
  description: 'Fetches the Baileys version',
  execute: async (sock, msg) => {
    const sender = msg.key.remoteJid;
    const { version } = await fetchLatestBaileysVersion();
    await sock.sendMessage(sender, { text: `Baileys Version: ${version}` });
  },
};
