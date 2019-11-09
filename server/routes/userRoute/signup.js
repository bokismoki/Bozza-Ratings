const router = require('express').Router();

const signupController = require('../../controllers/userController/signup');

router.post('/', signupController);

module.exports = router;