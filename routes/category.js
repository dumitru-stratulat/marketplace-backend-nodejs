
const express = require('express');

const categoryController = require('../controllers/category');

const router = express.Router();

router.get('/category/:gender/:subCategory', categoryController.getProductsByCategory);

module.exports = router;
