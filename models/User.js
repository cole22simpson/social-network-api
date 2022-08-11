const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: 'You must create a username.',
        trim: true
    },
    email: {
        type: String,
        required: 'You must add a valid email.',
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
      }
    ],
    friends: [
        {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
 ]
},
  {
    toJSON: {
      virtuals: true,
    }
  }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;