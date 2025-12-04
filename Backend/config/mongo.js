const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || process.env.DB_URI || '';

async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set in .env');
  }

  try {
    await mongoose.connect(MONGO_URI, {
      // modern mongoose versions enable the new parser and unified topology by default;
      // do not pass the removed/deprecated options to avoid errors
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
}

module.exports = { connectMongo, mongoose };