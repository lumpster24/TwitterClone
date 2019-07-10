const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  message: String,
  user: {
    type: ObjectId,
    ref: 'User',
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

postSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'replies',
  justOne: false,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;