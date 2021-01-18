// REQUIREMENTS
const express = require('express');
const gradient = require('gradient-string');

// VARIABLE DECLARATION
const app = express();
const PORT = process.env.PORT || 5000;

// ACTIONnpm
app.get('/', (rep, res) => res.send(`Api Running.`));
app.listen(PORT, ()=> console.log(gradient.morning(`Server started on PORT ${PORT}`)));