const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'YOUR_FRONTEND_RENDER_URL' // IMPORTANT: Replace this with your deployed frontend URL
        : 'http://localhost:5173' // Your local development URL for the frontend
}));

console.log('DEBUG: MONGO_URI from process.env:', process.env.MONGO_URI);
console.log('DEBUG: NODE_ENV from process.env:', process.env.NODE_ENV);

const connectDB = require('./db');
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/snippets', require('./routes/snippetRoutes'));

app.get('/', (req, res) => {
    res.send('API is running....');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});