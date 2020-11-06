const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  date: Date,
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme' },
  likes: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  file: String,
});

module.exports = mongoose.model('Post', postSchema);
