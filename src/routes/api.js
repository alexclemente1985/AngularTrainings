const express = require('express');
const consts = require('../consts');
const router = express.Router();

const {PersonController, ProductController, AuthController} = require('../controllers');

router.use(AuthController.checkToken);

router.get(consts.routes.api.PEOPLE, PersonController.all);
router.get(consts.routes.api.PRODUCTS, ProductController.all);

module.exports = router;