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

// CONNECT DATABASE
connectDB();

// INITI MIDDLEWARE
app.use(express.json({ extended: false }));

// ROUTES
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/metrics', require('./routes/api/metrics'));

app.listen(PORT, () => console.log(gradient.morning(`Server started on PORT ${PORT}`)));
