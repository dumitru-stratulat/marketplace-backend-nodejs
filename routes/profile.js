
const express = require('express');
const { body } = require('express-validator')

const profileController = require('../controllers/profile');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/profile/:profileId', profileController.getProducts);
router.post('/create',isAuth, profileController.createProduct);

module.exports = router;
