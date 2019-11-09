const router = require('express').Router();

const loginController = require('../../controllers/userController/login');

router.post('/', loginController);

module.exports = router;