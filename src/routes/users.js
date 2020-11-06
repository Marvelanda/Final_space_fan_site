const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const isProfileOwner = require('../middleware/profileowmer');

router
  .route('/signup')
  .get(usersController.renderSignUp)
  .post(usersController.signUp);

router
  .route('/signin')
  .get(usersController.renderSignIn)
  .post(usersController.signIn);

router.get('/logout', usersController.logOut);

router.get('/:id', isProfileOwner, usersController.showProfile);

module.exports = router;
