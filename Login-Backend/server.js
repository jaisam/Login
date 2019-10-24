// Require 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// Init app
const app = express();


// Listen to Port
app.listen(process.env.PORT,
    () => console.log(`Listening to ${process.env.PORT}`)
);

// Connecting Database
mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to DB!')
);


// Body-parser
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cors());


// Importing routes
const userRoute = require('./Routes/API/userRoute');


// Routes middleware
app.use('/User', userRoute);