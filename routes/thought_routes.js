const router = require('express').Router();
const { Thought, User } = require('../models');
const reactionSchema = require('../models/Reaction');

// GET to get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.json({ message: error.message });
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
        res.json({ message: error.message });
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
        res.json({ message: error, message });
    }
})

// DELETE to remove a thought by its _id
router.delete('/:id', getThought, async (req, res) => {
    try {
        await res.thought.deleteOne();
        res.json({ message: 'Deleted thought' });
    } catch (error) {
        res.json({ message: error.message });
    }

})

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // Extract the value of the thoughtId parameter from the req.params object
        const thoughtId = req.params.thoughtId;

        // Find the thought by its _id
        const thought = await Thought.findById(thoughtId);

        // Check if the thought exists
        if (thought == null) {
            return res.json({ message: 'Thought cannot found' });
        }

        const newReaction = {
            reactionBody: req.body.reactionBody,
            username: req.body.username
        };

        // Push the new reaction
        thought.reactions.push(newReaction);
        await thought.save();
        res.json({ message: 'Reaction added' });

    } catch (error) {
        res.json({ message: error.message });
    }

})

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.status(200).json(thought);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Create a function that will be use to find the thought by its id
async function getThought(req, res, next) {
    let thought;
    try {
        thought = await Thought.findById(req.params.id);
        if (thought == null) {
            return res.json({ message: 'Cannot find thought' });
        }

    } catch (error) {
        return res.json({ message: error.message });
    }
    res.thought = thought;
    next();
}


module.exports = router;