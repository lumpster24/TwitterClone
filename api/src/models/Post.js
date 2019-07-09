const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  user: {
    type: ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;