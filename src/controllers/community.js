const Division = require('../models/Division');
const Theme = require('../models/Theme');
const Smile = require('../models/Smile');
const Post = require('../models/Post');
const multer = require('multer');

const showForumPage = async (req, res) => {
  const divisions = await Division.find();
  res.render('community/main', { divisions });
};

const showThemes = async (req, res) => {
  const division = await Division.findById(req.params.id);
  const themes = await division.showThemes();

  res.render('community/themes', { themes, divisionId: req.params.id });
};

const showThemePosts = async (req, res) => {
  const theme = await Theme.findById(req.params.id);
  const posts = await theme.showThemePosts();

  const smiles = await Smile.find();

  res.render('community/posts/posts', {
    posts,
    smiles,
    themeTitle: theme.title,
    themeId: req.params.id,
    divisionId: theme.division,
  });
};

const renderNewThemeForm = async (req, res) => {
  const smiles = await Smile.find();
  res.render('community/newThemes', { smiles, divisionId: req.params.id });
};

const formatDate = () => {
  const d = new Date();
  const formatDate =
    ('0' + d.getDate()).slice(-2) +
    '.' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '.' +
    d.getFullYear() +
    ' ' +
    ('0' + d.getHours()).slice(-2) +
    ':' +
    ('0' + d.getMinutes()).slice(-2) +
    ':' +
    ('0' + d.getSeconds()).slice(-2);
  return formatDate;
};

const addNewTheme = async (req, res) => {
  const { title, postText } = req.body;

  const theme = new Theme({
    title,
    author: res.locals.userId,
    division: req.params.id,
    answerCount: 0,
  });

  await theme.save();

  let path;
  if (req.file) {
    path = req.file.path;
    path = path.replace('public', '');
  }

  if (postText && path) {
    const post = new Post({
      date: formatDate(),
      text: postText,
      author: res.locals.userId,
      theme,
      page: 1,
      likes: 0,
      page: 1,
      file: path,
    });
    await post.save();

    res.redirect(`/community/themes/${theme._id}`);
  } else if (postText) {
    const post = new Post({
      date: formatDate(),
      text: postText,
      author: res.locals.userId,
      theme,
      page: 1,
      likes: 0,
      page: 1,
    });
    await post.save();

    res.redirect(`/community/themes/${theme._id}`);
  } else if (path) {
    const post = new Post({
      date: formatDate(),
      author: res.locals.userId,
      theme,
      page: 1,
      likes: 0,
      page: 1,
      file: path,
    });

    await post.save();
    res.redirect(`/community/themes/${theme._id}`);
  } else {
    res.render('community/newThemes');
  }
};

const addNewPost = async (req, res) => {
  const { postText } = req.body;

  const theme = req.params.id;
  const findTheme = await Theme.findById(theme);
  let path;
  if (req.file) {
    path = req.file.path;
    path = path.replace('public', '');
  }

  if (postText && path) {
    const post = new Post({
      date: formatDate(),
      text: postText,
      author: res.locals.userId,
      theme,
      page: 1,
      likes: 0,
      page: 1,
      file: path,
    });
    await post.save();

    findTheme.answerCount++;
    await findTheme.save();

    post.user = res.locals.username;
    res.json({ post, user: post.user });
  } else if (postText) {
    const post = new Post({
      date: formatDate(),
      text: postText,
      author: res.locals.userId,
      theme,
      page: 1,
      likes: 0,
      page: 1,
    });
    await post.save();

    findTheme.answerCount++;
    await findTheme.save();

    post.user = res.locals.username;
    res.json({ post, user: post.user });
  } else if (path) {
    const post = new Post({
      date: formatDate(),
      author: res.locals.userId,
      theme,
      page: 1,
      likes: 0,
      page: 1,
      file: path,
    });
    await post.save();

    findTheme.answerCount++;
    await findTheme.save();
    post.user = res.locals.username;

    res.json({ post, user: post.user });
  } else {
    //prettier-ignore
    res.json({ error: 'You\'re trying to send the blank message. PLease write smth :)' });
  }
};

module.exports = {
  showForumPage,
  showThemes,
  showThemePosts,
  renderNewThemeForm,
  addNewTheme,
  addNewPost,
};
