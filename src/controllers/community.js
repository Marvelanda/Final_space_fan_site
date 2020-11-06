const Division = require('../models/Division');
const Theme = require('../models/Theme');
const Smile = require('../models/Smile');

const showForumPage = async (req, res) => {
  const divisions = await Division.find();
  res.render('community/main', { divisions });
};

const showThemes = async (req, res) => {
  const division = await Division.findById(req.params.id);
  const themes = await division.showThemes();
  res.render('community/themes', { themes });
};

const showThemePosts = async (req, res) => {
  const theme = await Theme.findById(req.params.id);
  const posts = await theme.showThemePosts();
  const smiles = await Smile.find();
  res.render('community/posts/posts', { posts, smiles });
};

const addNewPost = (req, res) => {
  console.log(req.body);
};

module.exports = {
  showForumPage,
  showThemes,
  showThemePosts,
  addNewPost,
};
