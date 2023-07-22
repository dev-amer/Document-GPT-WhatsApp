const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Access environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const FROM = process.env.FROM;

const DB_DIR = 'data/db';
const INPUT_FILE_PATH = 'data/input/sample.pdf';
const OUTPUT_DIR = 'data/output';

module.exports = {
  OPENAI_API_KEY,
  TWILIO_SID,
  TWILIO_TOKEN,
  FROM,
  DB_DIR,
  INPUT_FILE_PATH,
  OUTPUT_DIR,
};
