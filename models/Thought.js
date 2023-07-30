const {Schema, model, Types} = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        [reactionSchema]
    ]
})

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length
})

function dateFormat(timestamp) {
    const date = dayjs(timestamp);
    const formattedDate = date.format('MMM D, YYYY hh:mmA');
    return formattedDate;
  }

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;