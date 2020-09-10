
const express = require('express');
const { body } = require('express-validator')

const productController = require('../controllers/product');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/product/:productId',productController.getProduct);

module.exports = router;
