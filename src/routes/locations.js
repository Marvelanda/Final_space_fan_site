const express = require('express');

const locationsController = require('../controllers/locations');
const router = express.Router();

router.get('/', locationsController.renderAllLocations);
router.get('/:id', locationsController.renderSingleLocation);

module.exports = router;
