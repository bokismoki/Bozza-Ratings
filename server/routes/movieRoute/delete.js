const router = require('express').Router();

const deleteController = require('../../controllers/movieController/delete');
const authorize = require('../authorization');

router.delete('/:id', authorize, deleteController);

module.exports = router;