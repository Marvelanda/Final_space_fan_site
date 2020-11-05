const Post = require('../models/Post');

const isAuthor = async (req, res, next) => {
  const postId = await Post.findById(req.params.id).populate('author');

  if (req.session?.user.id === postId.author._id.toString()) {
    next();
  } else {
    res.render('error', { error: 'Oooops, you cannot do that!' });
  }
};

module.exports = isAuthor;
