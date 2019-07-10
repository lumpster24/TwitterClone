const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden'); 

const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  email: String,
  passwordHash: {
    type: String,
    hideJSON: true
  },
  following: {
    type: [ ObjectId ],
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

userSchema.plugin(mongooseHidden({ _id: false }));

const User = mongoose.model('User', userSchema);

module.exports = User;