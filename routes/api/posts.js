// Requirements
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// ------------
// GET REQUESTS
// ------------


// @route   GET api/posts
// @descr   Show all posts
// @access  Private
router.get(
    '/', auth, async (req, res) => {
        try {
            const post = await Post.find().sort({ date: -1 });
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/posts/:id
// @descr   Get posts by ID
// @access  Private
router.get(
    '/:id', auth, async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json({ msg: 'Post not found' });
            res.json(post);
        } catch (err) {
            console.error(err.message);
            if (err.kind == 'ObjectId') {
                return res.status(400).json({ msg: 'Post Not Found' })
            }
            res.status(500).send('Server Error');
        }
    }
);


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
router.post('/', auth, async (req, res) => { });


// ---------------
// DELETE REQUESTS
// ---------------


// @route   DELETE api/posts
// @descr   Delete as comment
// @access  Private
router.delete('/', auth, async (req, res) => { });


// @route   DELETE api/posts
// @descr   Delete a post
// @access  Private
router.delete('/', auth, async (req, res) => { });


// ------------
// PUT REQUESTS
// ------------
// @route   PUT api/posts
// @descr   Like a post
// @access  Private
router.put('/', auth, async (req, res) => { });

// @route   PUT api/posts
// @descr   Unlike a post
// @access  Private
router.put('/', auth, async (req, res) => { });



module.exports = router;