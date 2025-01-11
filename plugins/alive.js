const express = require('express');
const app = express();

// Simple route to display bot is alive
app.get('/', (req, res) => {
    res.send('WhatsApp Bot is Alive!');
});

// Keep the server alive with a ping route
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Set up the server to listen on a port
app.listen(process.env.PORT || 3000, () => {
    console.log('Bot is alive and running!');
});
