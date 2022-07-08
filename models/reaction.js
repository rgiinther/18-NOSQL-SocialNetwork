const {model, Schema, Types} = require('mongoose');
const moment = require('moment') 


const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username:{
    type: String,
    required: true
  },
  createdAt:{
   createdAt: {
    type: Date,
    default: Date.now,
    get:(time)=>moment(time).format("MM DD, YY [at] hh:mm a") 
  },
}

  })


  module.exports = reactionSchema;