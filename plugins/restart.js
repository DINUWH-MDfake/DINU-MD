const { exec } = require('child_process');

// Function to restart the bot when it crashes
const restartBot = () => {
    console.log('Bot crashed, restarting...');

    exec('node index.js', (error, stdout, stderr) => {
        if (error) {
            console.log(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};

// Monitor the bot process
process.on('exit', restartBot); // Restart on exit

// Optionally listen for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    restartBot();
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    restartBot();
});
