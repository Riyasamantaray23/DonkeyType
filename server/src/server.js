const express = require('express');
const dotenv =require('dotenv');
const cors = require('cors');

dotenv.config();
console.log('DEBUG: MONGO_URI from process.env:', process.env.MONGO_URI);

const connectDB = require('./db');
connectDB();



const app=express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res)=>{
    res.send('API is running....')
})
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}.`)
})
