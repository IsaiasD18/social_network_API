const {Schema, model, Types} = require('mongoose');

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
        ]
});


userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;