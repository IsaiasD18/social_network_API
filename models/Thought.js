const {Schema, modal, Types} = require('mongoose');
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
    ],
    toJSON: {
        virtuals: true,
      },
      virtuals: {
        reactionCount: {
          get() {
            return this.reactions.length;
          }
        }
      }
})

const Thought = modal('Thought', thoughtSchema);

module.exports = Thought;