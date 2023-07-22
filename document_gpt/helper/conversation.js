const { OpenAIEmbeddings } = require('langchain-embeddings');
const { Chroma } = require('langchain-vectorstores');
const { ChatOpenAI } = require('langchain-chat_models');
const { ConversationalRetrievalChain } = require('langchain-chains');
const { ConversationBufferMemory } = require('langchain-memory');

const config = require('./config');

async function createConversation() {
  const persistDirectory = config.DB_DIR;

  const embeddings = new OpenAIEmbeddings({
    openai_api_key: config.OPENAI_API_KEY,
  });

  const db = new Chroma({
    persist_directory: persistDirectory,
    embedding_function: embeddings,
  });

  const memory = new ConversationBufferMemory({
    memory_key: 'chat_history',
    return_messages: false,
  });

  const qa = await ConversationalRetrievalChain.from_llm({
    llm: new ChatOpenAI(),
    chain_type: 'stuff',
    retriever: db.as_retriever(),
    memory: memory,
    get_chat_history: (h) => h, // This is the equivalent of lambda h: h in Python
    verbose: true,
  });

  return qa;
}

module.exports = {
  createConversation,
};
