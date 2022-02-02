const express = require('express');
const consts = require('../consts');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post(consts.routes.auth.LOGIN,AuthController.login);
router.post(consts.routes.auth.REGISTER, AuthController.register);

module.exports = router;