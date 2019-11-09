const router = require('express').Router();

const moviesController = require('../../controllers/movies');

router.get('/', moviesController.getMovies);
router.post('/', moviesController.postMovie);

module.exports = router;