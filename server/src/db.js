// server/src/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`); // This line will show the specific error
    process.exit(1); // This will stop the server gracefully after the error
  }
};

module.exports = connectDB;
//conn	The object returned by mongoose.connect(...)
//conn.connection	The actual connection to MongoDB
//conn.connection.host	The hostname of the MongoDB server you're connected to (like cluster0.mongodb.net)