const mongoose = require('mongoose');
const Post = require('./Post');

const themeSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
  answerCount: { type: Number, default: 0 },
  maximumNumberOfPosts: { type: Number, default: 15 },
  currentNumberOfPosts: { type: Number, default: 0 },
});

themeSchema.methods.showThemePosts = async function () {
  const posts = await this.model('Post')
    .find({ division: this._id })
    .populate('author');
  return posts;
};

module.exports = mongoose.model('Theme', themeSchema);
