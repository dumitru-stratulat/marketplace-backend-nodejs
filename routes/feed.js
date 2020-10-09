
const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/feed', feedController.getProducts);

module.exports = router;
