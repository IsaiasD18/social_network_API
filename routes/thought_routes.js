const router = require('express').Router();
const {Thought, User} = require('../models');

// GET to get all thoughts
router.get('/', async (req, res) => {
    try {
    const thoughts = await Thought.find();
    res.json(thoughts);
    } catch (error) {
        res.json({message: error.message});
    }
    
})

// GET to get a single thought by its _id
router.get('/:id', getThought, (req, res) => {
    res.json(res.thought);
}) 

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post('/', async (req, res) => {
    const thought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username
    })
    try {
        const newThought = await thought.save();
        const user = await User.findById(req.body.userId);
        user.thoughts.push(newThought._id);
        await user.save();

        res.json(newThought);
    } catch (error) {
        res.json({message: error.message});
    }
})

// PUT to update a thought by its _id
router.put('/:id', getThought, async (req, res) => {
    if (req.body.thoughtText != null) {
        res.thought.thoughtText = req.body.thoughtText;
    }
    if (req.body.username != null) {
        res.thought.username = req.body.username;
    }
    try {
        const updatedThought = await res.thought.save();
        res.json(updatedThought);
    } catch (error) {
        res.json({message: error,message});
    }
})

// DELETE to remove a thought by its _id
router.delete('/:id', getThought, async (req, res) => {
    try {
        await res.thought.deleteOne();
        res.json({message: 'Deleted thought'});
    } catch (error) {
        res.json({message: error.message});
    }
    
})

async function getThought(req, res, next) {
    let thought;
    try {
    thought = await Thought.findById(req.params.id);
        if (thought == null) {
           return res.json({message: 'Cannot find thought'});
        }
        
    } catch (error) {
    return res.json({message: error.message});
    }
    res.thought = thought;
    next();
}


module.exports = router;