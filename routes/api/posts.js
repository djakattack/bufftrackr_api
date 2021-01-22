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
            const newPost = new Post({
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
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check Post
        if (!post) {
            return res.status(400).json({ msg: 'Post Not Found' })
        }

        // Check User
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" })
        }

        await post.remove();
        res.json({ msg: 'Post removed' });

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Post Not Found' })
        }
        res.status(500).send('Server Error');
    }
});


// ------------
// PUT REQUESTS
// ------------
// @route   PUT api/posts/like/:id
// @descr   Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        };

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/unlike/:id
// @descr   Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        };

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;