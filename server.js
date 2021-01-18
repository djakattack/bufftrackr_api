// REQUIREMENTS
// ============

require('dotenv').config();
const express = require('express');
const gradient = require('gradient-string');
const connectDB = require('./config/db');

// VARIABLE DECLARATION
// ====================

const app = express();
const PORT = process.env.PORT || 5000;

// ACTION
// ======

app.get('/', (rep, res) => res.send(`Api Running.`));
app.listen(PORT, ()=> console.log(gradient.morning(`Server started on PORT ${PORT}`)));

// CONNECT DATABASE
connectDB();