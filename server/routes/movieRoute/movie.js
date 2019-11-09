const router = require('express').Router();

const movieController = require('../../controllers/movieController/movie');

router.get('/:id', movieController);

module.exports = router;