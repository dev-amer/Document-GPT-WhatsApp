// app.js
const express = require('express');
const app = express();
const port = 3000; // Replace with your desired port

// Define your routes and middleware here
// Example:
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
