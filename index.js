const { default: makeWASocket, useMultiFileAuthState } = require('@adiwajshing/baileys');
const fs = require('fs');
const { botName, prefix, ownerNumber, welcomeMessage, sessionId } = require('./config.js');

// Bot Start Function
const startBot = async () => {
  // Auth State setup
  const { state, saveCreds } = await useMultiFileAuthState(`./auth_info/${sessionId}`);
  
  // Create socket for WhatsApp
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,  // Print the QR Code to scan with your phone
    logger: require('pino')({ level: 'info' })
  });

  // Connection update listener
  sock.ev.on('connection.update', (update) => {
    const { connection } = update;
    if (connection === 'open') {
      console.log(`${botName} connected successfully!`);
    }
  });

  // Message listener
  sock.ev.on('messages.upsert', async (messageUpdate) => {
    const message = messageUpdate.messages[0];
    if (!message.key.fromMe && message.message) {
      const sender = message.key.remoteJid;
      const text = message.message.conversation || '';

      // Respond to help command
      if (text.toLowerCase() === `${prefix}help`) {
        await sock.sendMessage(sender, { text: welcomeMessage });
      }

      // Respond to ping command
      if (text.toLowerCase() === `${prefix}ping`) {
        await sock.sendMessage(sender, { text: 'Pong! I am alive!' });
      }

      // Respond to owner check
      if (text.toLowerCase() === `${prefix}owner`) {
        if (message.key.remoteJid === ownerNumber) {
          await sock.sendMessage(sender, { text: `Hello Owner! I'm ${botName}.` });
        } else {
          await sock.sendMessage(sender, { text: `You are not the owner of ${botName}.` });
        }
      }
    }
  });

  // Save credentials on update
  sock.ev.on('creds.update', saveCreds);
};

startBot();
