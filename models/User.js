const {Schema, modal, Types} = require('mongoose');

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ],
        toJSON: {
            virtuals: true,
          },
          virtuals: {
            friendCount: {
              get() {
                return this.friends.length;
              }
            }
          }
});

const User = modal('User', userSchema);

module.exports = User;