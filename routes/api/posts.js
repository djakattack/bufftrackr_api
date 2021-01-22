// Requirements
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Models
const Posts = require('../../models/Posts');
const Profiles = require('../../models/Profiles');
const User = require('../../models/User');

// ------------
// GET REQUESTS
// ------------
// @route   GET api/posts
// @descr   Show all posts
// @access  Private


// @route   GET api/posts
// @descr   Get posts by ID
// @access  Private



// -------------
// POST REQUESTS
// -------------
// @route   POST api/posts
// @descr   Create a post
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Posts({
                text: req.body.text,
                name: user.name,
                user: req.user.id
            })
            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   POST api/posts
// @descr   Comment on a post
// @access  Private



// ---------------
// DELETE REQUESTS
// ---------------
// @route   DELETE api/posts
// @descr   Delete as comment
// @access  Private


// @route   DELETE api/posts
// @descr   Delete a post
// @access  Private



// ------------
// PUT REQUESTS
// ------------
// @route   PUT api/posts
// @descr   Like a post
// @access  Private


// @route   PUT api/posts
// @descr   Unlike a post
// @access  Private



module.exports = router;