const router = require('express').Router();

const deleteController = require('../../controllers/movieController/delete');

router.delete('/:id', deleteController);

module.exports = router;