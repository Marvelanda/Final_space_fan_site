const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: Number,
});

module.exports = mongoose.model('Post', postSchema);
