const dateFormat = require("../utils/dateFormat");
const { Schema, model, Types } = require("mongoose");


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
            get:timestamp => dateFormat(timestamp)
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

//get total reaction & reply countt
ThoughtSchema.virtual("reactionCount").get(function() {
  return this.reaction.length;
});

const Thoughts = model("Thought", ThoughtSchema);

module.exports = Thoughts;