const express = require('express');
const gradient = require('gradient-string');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/users
// @descr   Display all users
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.find({}, (err, users) => {
            var userMap = {};
            users.forEach((user) => {
                userMap[user._id] = user;
            });
            res.send(userMap);
        }).select('-password');
    } catch (err) {
        console.error(err.message);
    }
})

// @route   POST api/users
// @descr   Register User
// @access  Private
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email address').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            user = new User({
                name,
                email,
                password
            });

            //Create a salt to do the password hashing
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

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