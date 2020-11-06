const express = require('express');

const router = express.Router();
const communityController = require('../controllers/community');

router.get('/divisions', communityController.showForumPage);
router.post('/posts/new', communityController.addNewPost);

router.get('/divisions/:id', communityController.showThemes);
router.get('/themes/:id', communityController.showThemePosts);

module.exports = router;
