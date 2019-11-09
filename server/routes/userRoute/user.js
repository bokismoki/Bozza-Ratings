const router = require('express').Router();

const userController = require('../../controllers/userController/user');

router.patch('/:id', userController);

module.exports = router;