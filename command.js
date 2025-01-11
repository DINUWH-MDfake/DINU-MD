const { fetchLatestBaileysVersion } = require('@adiwajshing/baileys');
const { default: makeWASocket } = require('@adiwajshing/baileys');
const config = require('./config.js');

// Handle incoming messages and commands
async function handleCommands(sock, msg) {
  const messageContent = msg?.message?.conversation;
  const sender = msg.key.remoteJid;

  if (!messageContent) return;

  switch (messageContent.toLowerCase()) {
    case 'ping':
      await sock.sendMessage(sender, { text: 'Pong!' });
      break;
    case 'version':
      const { version } = await fetchLatestBaileysVersion();
      await sock.sendMessage(sender, { text: `Baileys Version: ${version}` });
      break;
    case 'help':
      const helpMessage = `
Available Commands:
1. *ping* - Responds with "Pong!"
2. *version* - Fetches Baileys version
3. *help* - Lists all available commands
      `;
      await sock.sendMessage(sender, { text: helpMessage });
      break;
    default:
      await sock.sendMessage(sender, { text: 'Unknown command. Type *help* for available commands.' });
      break;
  }
}

module.exports = { handleCommands };            return;
        }
        try {
            const video = await TikTokScraper.getVideoMeta(url);
            const videoUrl = video.collector[0].videoUrl;
            await sock.sendMessage(sender, { text: `Downloading TikTok video...` });
            await sock.sendMessage(sender, { video: { url: videoUrl } });  // Send the video directly
        } catch (error) {
            await sock.sendMessage(sender, { text: 'Error downloading TikTok video.' });
        }
    }

    // Facebook Video Download Command
    if (text.toLowerCase().startsWith(`${prefix}download fb`)) {
        const url = text.split(' ')[1]; // Extract the Facebook URL
        if (!url) {
            await sock.sendMessage(sender, { text: 'Please provide a Facebook URL.' });
            return;
        }
        try {
            const video = await FacebookDownloader.download(url);
            await sock.sendMessage(sender, { text: `Downloading Facebook video...` });
            await sock.sendMessage(sender, { video: { url: video.url } });  // Send the video directly
        } catch (error) {
            await sock.sendMessage(sender, { text: 'Error downloading Facebook video.' });
        }
    }

    // Help Command (Optional)
    if (text.toLowerCase() === `${prefix}help`) {
        await sock.sendMessage(sender, {
            text: `
Available Commands:
- !download yt [YouTube URL]: Download YouTube MP3
- !download tiktok [TikTok URL]: Download TikTok video
- !download fb [Facebook URL]: Download Facebook video
- !help: Show this help message`
        });
    }
};

module.exports = { handleCommands };
