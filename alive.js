const fs = require('fs');

const checkBotAlive = () => {
  fs.exists('./session.json', (exists) => {
    if (exists) {
      console.log('Bot is alive and session is active!');
    } else {
      console.log('Bot session is not found. Please log in again.');
    }
  });
};

// Check if the bot is alive every 5 minutes
setInterval(checkBotAlive, 300000); // 300000 ms = 5 minutes

// Initial check when the script runs
checkBotAlive();
