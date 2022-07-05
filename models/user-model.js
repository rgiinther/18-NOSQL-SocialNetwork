const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true, 
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/,"not a valid email"]
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'thoughts'
            }
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ]
    })

    UserSchema.virtual('friendCount').get(function() {
        return this.friends.length
    })
    const User = model("User",userSchema)
    module.exports = User