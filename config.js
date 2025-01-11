const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/k1RH9bH/1086.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "Hi.i am Denuwan md whatsapp bot, iam alive new",
SESSION_ID: process.env.SESSION_ID || "SAxwXRRb#FNMrjBA3ZqUCbLdOAloY_iyvNUiG3Log1mtLjBVwh2Y",
};
