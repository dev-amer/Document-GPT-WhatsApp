// createIndex.js
const fs = require('fs');
const { PDFParser } = require('pdf2json');
const dir = require('node-dir');
const { CharacterTextSplitter } = require('langchain-text-splitter'); // Assuming an equivalent Node.js library exists
const { OpenAIEmbeddings } = require('langchain-embeddings'); // Assuming an equivalent Node.js library exists
const { Chroma } = require('langchain-vectorstores'); // Assuming an equivalent Node.js library exists

const config = require('./config');

async function extractTextFromPDF(file_path) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on('pdfParser_dataReady', (pdfData) => {
      resolve(pdfData.text);
    });
    pdfParser.on('pdfParser_dataError', (errData) => {
      reject(errData.parserError);
    });
    pdfParser.loadPDF(file_path);
  });
}

async function createIndex(file_path) {
  try {
    const text = await extractTextFromPDF(file_path);

    // Save the extracted text to output.txt
    fs.writeFileSync(`${config.OUTPUT_DIR}/output.txt`, text);

    // Load the documents
    const documents = await new Promise((resolve, reject) => {
      dir.readFiles(
        config.OUTPUT_DIR,
        { match: /.txt$/, recursive: true },
        (err, content, filename, next) => {
          if (err) reject(err);
          next();
        },
        () => {
          resolve();
        }
      );
    });

    const text_splitter = new CharacterTextSplitter({
      separator: '\n',
      chunkSize: 1024,
      chunkOverlap: 128,
    });

    const texts = text_splitter.splitDocuments(documents);

    const embeddings = new OpenAIEmbeddings({
      openai_api_key: config.OPENAI_API_KEY,
    });

    const persist_directory = config.DB_DIR;

    const vectordb = Chroma.fromDocuments({
      documents: texts,
      embedding: embeddings,
      persist_directory: persist_directory,
    });

    vectordb.persist();
  } catch (err) {
    console.error('Error occurred while processing PDF:', err);
  }
}

module.exports = {
  createIndex,
};
