const isProfileOwner = (req, res, next) => {
  if (req.session.user.id === req.params.id) {
    next();
  } else {
    res.render('error', { error: 'Oooops, you cannot do that!' });
  }
};

module.exports = isProfileOwner;
