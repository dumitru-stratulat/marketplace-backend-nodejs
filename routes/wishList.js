
const express = require('express');
const { body } = require('express-validator')

const wishController = require('../controllers/wishList');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/wishList', wishController.addWishList);
router.get('/wishList',isAuth, wishController.getWishList);


module.exports = router;
