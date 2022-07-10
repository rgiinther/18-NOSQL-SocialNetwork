const moment = require('moment');
const { Schema, model, Types } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      maxlength: 280,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            unique: true,
            required: true, 
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get:(time)=>moment(time).format("MM DD, YY [at] hh:mm a")
        },
        username: {
                type: String,
                required: true
        },
        reaction:[reactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length
    })
    const Thought = model("Thought",ThoughtSchema);
    
    module.exports = Thought;