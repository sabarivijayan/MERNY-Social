const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  tag: {
    type: Object
  },
  reply: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment'
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  postUserId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
