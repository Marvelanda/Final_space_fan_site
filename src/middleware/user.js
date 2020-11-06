const isUser = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.username = req.session.user.username;
    res.locals.userId = req.session.user.id;
  } else {
    res.locals.username = null;
  }
  next();
};

module.exports = isUser;
