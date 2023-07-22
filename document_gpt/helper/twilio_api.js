// twilioApi.js
const { Twilio } = require('twilio');
const config = require('./config');

const accountSid = config.TWILIO_SID;
const authToken = config.TWILIO_TOKEN;

const client = new Twilio(accountSid, authToken);

async function sendMessage(to, message) {
  try {
    await client.messages.create({
      body: message,
      from: config.FROM,
      to: to,
    });

    console.log('Message sent successfully.');
  } catch (err) {
    console.error('Error occurred while sending the message:', err);
  }
}

module.exports = {
  sendMessage,
};
