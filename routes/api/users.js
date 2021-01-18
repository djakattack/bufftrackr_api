const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   POST api/users
// @descr   Register User
// @access  Public
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
            console.log(`User: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`password (pre-hash): ${password}`);

            //Create a salt to do the password hashing
            const salt = await bcrypt.genSalt(10);
            console.log(`salt: ${salt}`);
            user.password = await bcrypt.hash(password, salt);
            console.log(`password (post hash): ${password}`);
            user.save();

            // Return JSON Web Token
            res.send(`User Created`);
        } catch (err) {
            console.error(gradient.mind(err.message));
            res.status(500).send('Server Error');
            process.exit(1);
        }

    }
);

module.exports = router;