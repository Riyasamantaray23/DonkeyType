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
        ? 'YOUR_FRONTEND_RENDER_URL' // IMPORTANT: Replace this with your deployed frontend URL
        : 'http://localhost:5173' // Your local development URL for the frontend
}));

// Debugging log (can be removed once deployed successfully)
console.log('DEBUG: MONGO_URI from process.env:', process.env.MONGO_URI);
console.log('DEBUG: NODE_ENV from process.env:', process.env.NODE_ENV);


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