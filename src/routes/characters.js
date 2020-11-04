const express = require('express');

const charactersController = require('../controllers/characters');
const router = express.Router();

router.get('/', charactersController.renderAllCharacters);
router.get('/:id', charactersController.renderSingleCharacter);

module.exports = router;
