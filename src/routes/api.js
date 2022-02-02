const express = require('express');
const consts = require('../consts');
const router = express.Router();

const PersonController = require('../controllers/PersonController');
const ProductController = require('../controllers/ProductController');

router.get(consts.routes.api.PEOPLE, PersonController.all);
router.get(consts.routes.api.PRODUCTS, ProductController.all);

module.exports = router;