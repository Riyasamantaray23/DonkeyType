// server/src/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 1. Load environment variables FIRST, immediately after imports
dotenv.config();

const app = express();

// 2. Configure CORS - ONLY ONCE, and use process.env.NODE_ENV correctly
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://frontend-5g8g.onrender.com'
        : 'http://localhost:5173' 
}));

// Connect to the database
const connectDB = require('./db');
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define API Routes
app.use('/api/snippets', require('./routes/snippetRoutes'));

// Basic test route
app.get('/', (req, res) => {
    res.send('API is running....');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
