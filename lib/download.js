const fs = require('fs');
const axios = require('axios');
const ytdl = require('ytdl-core');
const tiktokScraper = require('tiktok-scraper');
const fbDownloader = require('facebook-video-downloader');

// Download YouTube video
const downloadYouTube = async (url, outputPath) => {
    try {
        console.log('Downloading YouTube video...');
        const info = await ytdl.getInfo(url);
        const videoStream = ytdl(url, { quality: 'highest' });
        videoStream.pipe(fs.createWriteStream(outputPath));
        videoStream.on('finish', () => {
            console.log(`Downloaded YouTube video: ${info.videoDetails.title}`);
        });
    } catch (err) {
        console.error('Error downloading YouTube video:', err);
    }
};

// Download TikTok video
const downloadTikTok = async (url, outputPath) => {
    try {
        console.log('Downloading TikTok video...');
        const video = await tiktokScraper.getVideoByUrl(url);
        const videoUrl = video.videoUrl;
        const response = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'stream'
        });
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);
        writer.on('finish', () => {
            console.log(`Downloaded TikTok video: ${video.authorMeta.name}`);
        });
    } catch (err) {
        console.error('Error downloading TikTok video:', err);
    }
};

// Download Facebook video
const downloadFacebook = async (url, outputPath) => {
    try {
        console.log('Downloading Facebook video...');
        const videoUrl = await fbDownloader(url);
        const response = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'stream'
        });
        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);
        writer.on('finish', () => {
            console.log(`Downloaded Facebook video.`);
        });
    } catch (err) {
        console.error('Error downloading Facebook video:', err);
    }
};

// Main function to download the appropriate video
const downloadVideo = async (platform, url, outputPath) => {
    switch (platform.toLowerCase()) {
        case 'youtube':
            await downloadYouTube(url, outputPath);
            break;
        case 'tiktok':
            await downloadTikTok(url, outputPath);
            break;
        case 'facebook':
            await downloadFacebook(url, outputPath);
            break;
        default:
            console.log('Unsupported platform!');
    }
};

// Example Usage
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with the video URL
const platform = 'youtube'; // 'youtube', 'tiktok', 'facebook'
const outputPath = './video.mp4'; // Path to save the downloaded video

downloadVideo(platform, url, outputPath);
