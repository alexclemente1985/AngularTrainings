const express = require('express');
const consts = require('../consts');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post(consts.routes.auth.LOGIN,AuthController.login);
router.post(consts.routes.auth.REGISTER, AuthController.register);

router.use(AuthController.checkToken);
router.get(consts.routes.auth.USER, AuthController.userData);

module.exports = router;