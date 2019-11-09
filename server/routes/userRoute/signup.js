const router = require('express').Router();

const signupController = require('../../controllers/signup');

router.post('/', signupController);

module.exports = router;