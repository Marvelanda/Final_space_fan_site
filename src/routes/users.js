const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router
  .route('/signup')
  .get(usersController.renderSignUp)
  .post(usersController.signUp);

router
  .route('/signin')
  .get(usersController.renderSignIn)
  .post(usersController.signIn);

router.get('/logout', usersController.logOut);

module.exports = router;
