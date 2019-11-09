const router = require('express').Router();

const deleteController = require('../../controllers/delete');

router.delete('/:id', deleteController);

module.exports = router;