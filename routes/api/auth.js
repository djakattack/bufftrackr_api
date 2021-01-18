const express = require('express');
const gradient = require('gradient-string');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// @route   GET api/auth
// @descr   
// @access  Protected
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth
// @descr   Authenticate user and get token
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email address').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Ensure the password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            // Return JSON Web Token
            const payload = {
                user: {
                    id: user.id
                }
            }
            //  TO DO: CHANGE EXPIRES IN
            jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(gradient.mind(err.message));
            res.status(500).send('Server Error');
            process.exit(1);
        }

    }
);

module.exports = router;