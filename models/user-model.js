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
                type: Schema.Types.ObjectId,
                // referring to the thought document model 
                ref: 'Thought'
            }
            ],
            friends: [
            {
                type: Schema.Types.ObjectId,
                // referring to the user document model 
                ref: 'User'
            }
            ]
        },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });
    
    UserSchema.virtual('friendCount').get(function() {
        return this.friends.length
    })
    const User = model("User",userSchema);
    
    module.exports = User;