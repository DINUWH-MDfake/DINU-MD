const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Download a file from a URL and save it to a local path
async function downloadFile(url, filename) {
  const response = await axios({
    method: 'get',
    url,
    responseType: 'stream',
  });

  const filePath = path.join(__dirname, '..', 'downloads', filename);
  response.data.pipe(fs.createWriteStream(filePath));
  
  return new Promise((resolve, reject) => {
    response.data.on('end', () => resolve(filePath));
    response.data.on('error', (err) => reject(err));
  });
}

module.exports = { downloadFile };
