const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    username: {   
      type: String,
      required: true,
      trim: true
    },

    createdAt: {
      type: Date,
      default: Date.now, 
      get: (timestamp) => dateFormat(timestamp),
    },
    
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
)

   

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;