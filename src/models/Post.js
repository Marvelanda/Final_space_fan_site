const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  date: String,
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme' },
  file: String,
});

module.exports = mongoose.model('Post', postSchema);
