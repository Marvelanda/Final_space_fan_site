require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const salt = process.env.saltRounds || 10;

const serializeUser = (user) => {
  return {
    username: user.username,
    id: user._id,
    email: user.email,
  };
};

const renderSignUp = (req, res) => {
  res.render('signup');
};

const renderSignIn = (req, res) => {
  res.render('signin');
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    try {
      const hashPass = await bcrypt.hash(password, Number(salt));

      const newUser = new User({
        username,
        email,
        password: hashPass,
      });
      await newUser.save();

      req.session.user = serializeUser(newUser);

      res.redirect('/');
    } catch (err) {
      res.render('signup', { error: 'User already exists' });
    }
  } else {
    res.render('signup', { error: 'Please fill in all the fields' });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.findOne({ email }).lean();
      if (user) {
        const validPass = await bcrypt.compare(password, user.password);
        if (validPass) {
          req.session.user = serializeUser(user);
          res.redirect('/');
        } else {
          res.render('signin', { error: 'Sorry! Wrong password or email.' });
        }
      } else {
        res.render('signin', { error: 'No such a user, please sign up.' });
      }
    } catch (err) {
      res.redirect('signin');
    }
  } else {
    res.render('signin', { error: 'Please fill in all the fields' });
  }
};

const logOut = (req, res) => {
  req.session.destroy(function (err) {
    if (err) throw new Error(err);
    res.clearCookie(req.app.get('session cookie name'));
    return res.redirect('/');
  });
};

module.exports = {
  renderSignUp,
  renderSignIn,
  signUp,
  signIn,
  logOut,
};
