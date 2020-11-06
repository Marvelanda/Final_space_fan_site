const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  date: Date,
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme' },
  likes: Number,
  page: { type: Number, default: 1 },
  file: Buffer,
});

module.exports = mongoose.model('Post', postSchema);
