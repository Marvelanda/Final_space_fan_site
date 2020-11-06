const express = require('express');
const multer = require('multer');

const router = express.Router();
const communityController = require('../controllers/community');

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, './public/img');
  },
  filename(request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

router.get('/divisions', communityController.showForumPage);
router.get('/divisions/:id', communityController.showThemes);
router.get('/divisions/:id/themes/new', communityController.renderNewThemeForm);
router.get('/themes/:id', communityController.showThemePosts);

router.post(
  '/divisions/:id/themes',
  upload.single('file'),
  communityController.addNewTheme
);
router.post(
  '/themes/:id/posts',
  upload.single('file'),
  communityController.addNewPost
);

module.exports = router;
