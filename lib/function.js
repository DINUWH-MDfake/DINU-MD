const ytdl = require('ytdl-core');
const TikTokScraper = require('tiktok-scraper');
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');

// Function to handle YouTube MP3 download
const downloadYouTubeMP3 = async (url, sock, sender) => {
    try {
        const info = await ytdl.getInfo(url);
        const audio = ytdl(url, { filter: 'audioonly' });
        await sock.sendMessage(sender, { text: `Downloading YouTube MP3: ${info.videoDetails.title}` });
        audio.pipe(fs.createWriteStream(`${info.videoDetails.title}.mp3`));
    } catch (error) {
        await sock.sendMessage(sender, { text: 'Error downloading YouTube MP3.' });
    }
};

// Function to handle TikTok video download
const downloadTikTokVideo = async (url, sock, sender) => {
    try {
        const video = await TikTokScraper.getVideoMeta(url);
        const videoUrl = video.collector[0].videoUrl;
        await sock.sendMessage(sender, { text: `Downloading TikTok video...` });
        await sock.sendMessage(sender, { video: { url: videoUrl } });
    } catch (error) {
        await sock.sendMessage(sender, { text: 'Error downloading TikTok video.' });
    }
};

// Function to handle Facebook video download
const downloadFacebookVideo = async (url, sock, sender) => {
    try {
        const video = await axios.get(`https://api.fbdown.net/`, { params: { url } });
        const videoUrl = video.data.url;
        await sock.sendMessage(sender, { text: `Downloading Facebook video...` });
        await sock.sendMessage(sender, { video: { url: videoUrl } });
    } catch (error) {
        await sock.sendMessage(sender, { text: 'Error downloading Facebook video.' });
    }
};

// Function to send text response
const sendTextMessage = async (sock, sender, message) => {
    await sock.sendMessage(sender, { text: message });
};

// Function to execute a command in the system
const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return
