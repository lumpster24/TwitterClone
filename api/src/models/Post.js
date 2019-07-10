const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  message: String,
  user: {
    type: ObjectId,
    ref: 'User',
  },
  parentPost: {
    type: ObjectId,
    ref: 'Post',
  },
  replies: {
    type: [ ObjectId ],
    ref: 'Post',
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;