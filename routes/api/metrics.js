const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Metrics = require('../../models/Metrics');

// ------------
// GET REQUESTS
// ------------

module.exports = router;