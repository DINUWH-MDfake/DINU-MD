const { exec } = require('child_process');
const ytdl = require('ytdl-core');
const TikTokScraper = require('tiktok-scraper');
const FacebookDownloader = require('facebook-video-downloader');
const fs = require('fs');

// Commands Handlers
const handleCommands = async (sock, message) => {
    const sender = message.key.remoteJid;
    const text = message.message.conversation || '';
    
    // Command prefix (adjust it if needed)
    const prefix = '!';

    // YouTube MP3 Download Command
    if (text.toLowerCase().startsWith(`${prefix}download yt`)) {
        const url = text.split(' ')[1]; // Extract the YouTube URL
        if (!url) {
            await sock.sendMessage(sender, { text: 'Please provide a YouTube URL.' });
            return;
        }
        try {
            const info = await ytdl.getInfo(url);
            const audio = ytdl(url, { filter: 'audioonly' });
            await sock.sendMessage(sender, { text: `Downloading YouTube MP3: ${info.videoDetails.title}` });
            audio.pipe(fs.createWriteStream(`${info.videoDetails.title}.mp3`));  // Save file locally
        } catch (error) {
            await sock.sendMessage(sender, { text: 'Error downloading YouTube MP3.' });
        }
    }

    // TikTok Video Download Command
    if (text.toLowerCase().startsWith(`${prefix}download tiktok`)) {
        const url = text.split(' ')[1]; // Extract the TikTok URL
        if (!url) {
            await sock.sendMessage(sender, { text: 'Please provide a TikTok URL.' });
            return;
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
