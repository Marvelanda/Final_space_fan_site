const express = require('express');

const router = express.Router();
const episodesController = require('../controllers/episodes');

router.get('/', episodesController.renderAllEpisodes);
router.get('/:id', episodesController.renderSingleEpisode);

module.exports = router;
