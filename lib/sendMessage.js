async function sendMessage(sock, recipient, message) {
  try {
    await sock.sendMessage(recipient, { text: message });
  } catch (error) {
    console.error(`Error sending message to ${recipient}:`, error);
  }
}

module.exports = { sendMessage };
