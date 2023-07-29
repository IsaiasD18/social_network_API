const router = require('express').Router();
const { User } = require('../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({message: error.message});
    }
})

// GET a single user by its _id and populated thought and friend data
router.get('/:id', getUser, (req, res) => {
 res.json(res.user);
})

// POST a new user:
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email
    });
    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (error) {
        res.json({message: error.message});
    }
}) 

// PUT to update a user by its _id
router.put('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.json({message: error,message});
    }
})

// DELETE to remove user by its _id
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({message: 'User Deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

async function getUser(req, res, next) {
let user;
    try {
    user = await User.findById(req.params.id);
        if (user == null) {
           return res.json({message: 'Cannot find user'});
        }
        
    } catch (error) {
    return res.json({message: error.message});
    }
    res.user = user;
    next();
}

module.exports = router;