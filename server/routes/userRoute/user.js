const router = require('express').Router();

const userController = require('../../controllers/userController/user');
const authorize = require('../authorization');

router.patch('/:id', authorize, userController);

module.exports = router;