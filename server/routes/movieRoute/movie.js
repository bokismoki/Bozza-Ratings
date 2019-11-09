const router = require('express').Router();

const movieController = require('../../controllers/movie');

router.get('/:id', movieController);

module.exports = router;