const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const express = require('express');
const fs = require('fs');

// Session file path
const sessionFile = './session.json';

// Create Express server
const app = express();
app.get('/', (req, res) => {
    res.send('WhatsApp Bot is Running!');
});

// Initialize WhatsApp bot
async function startBot() {
    const { state, saveState } = useSingleFileAuthState(sessionFile);
    
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state
    });

    // Save session state to file
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            console.log('Connection lost, reconnecting...');
            startBot(); // Reconnect if disconnected
        } else if (connection === 'open') {
            console.log('Bot connected successfully!');
        }

        if (lastDisconnect?.error?.output?.statusCode === DisconnectReason.loggedOut) {
            console.log('You are logged out, please scan QR again.');
        }

        // Save state on every update
        saveState();
    });

    // Respond to incoming messages
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        const msg = messages[0];
        console.log('Received message: ', msg);

        if (msg?.message?.conversation === 'ping') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Pong!' });
        }
    });

    return sock;
}

// Start the bot
startBot();

// Start Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
