const express = require('express');

const router = express.Router();
const indexController = require('../controllers/index');

router.get('/', indexController.index);

router.post('/search', indexController.search);

module.exports = router;
