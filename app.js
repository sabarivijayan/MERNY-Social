const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const env = require('dotenv');
env.config();
const cookieParser = require("cookie-parser"); 

//Middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors());
app.use(cors({
     origin: 'http:localhost:3000',
}));
    

//import routes
const post = require('./routes/index')



//using Routes

app.use('/api/v1', post)

module.exports = app;