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

// @route   POST api/posts/comment/:id
// @descr   Comment on a post
// @access  Private
router.post(
    '/comment/:id',
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
            const post = await Post.findById(req.params.id);
            const newComment = {
                text: req.body.text,
                name: user.name,
                user: req.user.id
            }

            post.comments.unshift(newComment);

            await post.save();
            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// ---------------
// DELETE REQUESTS
// ---------------


// @route   DELETE api/posts/comment/:id/:comment_id
// @descr   Delete a comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        // Make sure comment exits
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" })
        }

        // Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'comment Not Found' })
        }
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/posts/:id
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

// @todo    These two routes are not part of the tutorial, but I think it'd be nice to have.

// @route   PUT api/posts/like/comment/:id
// @descr   Like a comment
// @access  Private

// @route   PUT api/posts/ulike/comment/:id
// @descr   Unike a comment
// @access  Private

module.exports = router;