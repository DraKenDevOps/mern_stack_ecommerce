require("./database/db").connect();
require("dotenv").config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const path = require('path');
const { readdirSync } = require( 'fs');

const app = express();

app.use(morgan('dev')); 
app.use(cors());
app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({ extended: true })); 

// Routes
readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`));
});

module.exports = app;