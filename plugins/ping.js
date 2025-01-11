// plugins/ping.js
module.exports = {
  name: 'ping',
  description: 'Responds with Pong!',
  execute: async (sock, msg) => {
    const sender = msg.key.remoteJid;
    await sock.sendMessage(sender, { text: 'Pong!' });
  },
};
