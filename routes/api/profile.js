const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profiles');
const User = require('../../models/User');


// ------------
// GET REQUESTS
// ------------

// @route   GET api/profile/me
// @descr   Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
        if (!profile) {
            res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    res.send(`Profile Route`);
});

// @route   GET api/profile
// @descr   Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'email']);
        res.json(profiles)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/profile/user/:user_id
// @descr   Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'email']);
        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);

        // Make sure we don't get the "Server Erorr" message when an ID is entered with too many characters
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.status(500).send('Server error');
    }
});


// -------------
// POST REQUESTS
// -------------

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
    '/',
    // Need to use Auth AND validation middleware, thus the array here.  But why?
    [
        auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // res.send("Ok");

        const {
            company,
            status,
            website,
            skills,
            location,
            bio,
            githubusername,
            instagram
        } = req.body;

        // BUILD PROFILE OBJECTS
        const profileFields = {};
        profileFields.user = req.user.id;

        // @todo Find a more efficient way to make this happen.

        if (company) profileFields.company = company
        if (status) profileFields.status = status
        if (website) profileFields.website = website
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (githubusername) profileFields.githubusername = githubusername
        if (instagram) profileFields.instagram = instagram

        // BUILD SOCIAL OBJECT
        profileFields.social = {};
        if (githubusername) profileFields.social.githubusername = githubusername
        if (instagram) profileFields.social.instagram = instagram

        try {
            // Mongoose methods must have await.
            let profile = await Profile.findOne({ user: req.user.id }); //req.user.id comes from the token.
            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        // For some reason this does not log as an array if console is logged in ES6.  Why?
        // console.log(`profileFields.skills: ${profileFields.skills}`);
        console.log(profileFields.skills);
        res.send(`Hello`);
    });

// ------------
// PUT REQUESTS
// ------------


// @route   PUT api/profile/experience
// @descr   Add experience to profile
// @access  Private
router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'company is required').not().isEmpty(),
            check('from', 'from is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });


// ---------------
// DELETE REQUESTS
// ---------------


// @route   DELETE api/profile
// @descr   Get profile, user, & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove users posts
        // REMOVE PROFILE
        await Profile.findOneAndRemove({ user: req.user.id })

        // REMOVE USER
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: 'User removed' });

    } catch (err) {
        console.error(err.message);

        // Make sure we don't get the "Server Erorr" message when an ID is entered with too many characters
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.status(500).send('Server error');
    }
});

// @route   DELETE api/profile/experience
// @descr   Add experience to profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }); // Find the profile

        // GET REMOVE INDEX
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;