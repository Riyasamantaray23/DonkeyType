const express = require('express');
const dotenv =require('dotenv');
const cors = require('cors');

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'YOUR_FRONTEND_RENDER_URL' // You'll fill this in later
        : 'http://localhost:5173' // Or whatever your local frontend port is
}));

dotenv.config();
console.log('DEBUG: MONGO_URI from process.env:', process.env.MONGO_URI);

const connectDB = require('./db');
connectDB();



const app=express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.use('/api/snippets', require('./routes/snippetRoutes')); 


app.get('/', (req, res)=>{
    res.send('API is running....')
})
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}.`)
})
