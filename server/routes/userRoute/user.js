const router = require('express').Router();

const userController = require('../../controllers/user');

router.patch('/:id', userController);

module.exports = router;