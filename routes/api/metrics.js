const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator');
const Profile = require('../../models/Profile');

// GET
// @route   GET api/metrics
// @descr   Test Route
// @access  Public
// router.get('/', (req, res) => res.send('Test route'));


// PUT
// @route   PUT api/profile/metrics
// @descr   Add a new metric
// @access  Private
router.put(
    '/', auth,
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            weight,
            bodyfat
        } = req.body
        
        const newMetrics = {
            weight,
            bodyfat
        };
        
        try{
            const profile = await Profile.findOne({ user: req.user.id });
            profile.metrics.unshift(newMetrics);
            await profile.save();
            res.json(profile);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        
    }
);



module.exports = router;