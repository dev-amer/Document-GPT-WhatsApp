// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { create_conversation } = require('./document_gpt/helper/conversation');
const { send_message } = require('./document_gpt/helper/twilio_api');

const qa = create_conversation();

const app = express();
const port = 3000; // Replace with your desired port

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.post('/twilio', async (req, res) => {
  try {
    const query = req.body.Body;
    const sender_id = req.body.From;
    console.log(sender_id, query);

    // TODO
    // get the user
    // if not create
    // create chat_history from the previous conversations
    // question and answer
    const response = await qa({
      question: query,
      chat_history: {},
    });

    console.log(response);

    send_message(sender_id, response.answer);

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error occurred while handling the Twilio request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
