require('dotenv').config();
const { connectMongo, mongoose } = require('./config/mongo');

(async () => {
  try {
    console.log('Using MONGO_URI:', process.env.MONGO_URI || process.env.DB_URI);
    await connectMongo();

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    await mongoose.disconnect();
    console.log('MongoDB test completed successfully');
  } catch (err) {
    console.error('MongoDB test failed:', err.message);
    process.exit(1);
  }
})();