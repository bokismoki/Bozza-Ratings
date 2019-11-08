const router = require('express').Router();

const selectedMovieController = require('../controllers/selectedMovie');

router.get('/:id', selectedMovieController);

module.exports = router;