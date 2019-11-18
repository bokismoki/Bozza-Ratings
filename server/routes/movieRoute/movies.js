const router = require('express').Router();

const moviesController = require('../../controllers/movieController/movies');
const authorize = require('../authorization');

router.get('/', moviesController.getMovies);
router.post('/', authorize, moviesController.postMovie);

module.exports = router;