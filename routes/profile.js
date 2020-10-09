
const express = require('express');
const { body } = require('express-validator')

const profileController = require('../controllers/profile');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/profile/:profileId',profileController.getProducts);
router.post('/create',
[ 
body('title')
  .isLength({min: 2})
  .isLength({max: 100}),
  //for future development
//   body('content')
//   .isLength({min: 2})
//   .isLength({max: 500}),
//   body('category')
//   .not()
//   .isEmpty(),
//   body('images')
//   .not()
//   .isEmpty(),
//   body('condition')
//   .not()
//   .isEmpty(),
//   body('size')
//   .not()
//   .isEmpty(),
//   body('contactNumber')
//   .isNumeric()
//   .isLength({min: 5})
//   .isLength({max: 12}),
//   body('price')
//   .isNumeric()
//   .not()
//   .isEmpty(),
],
isAuth,
profileController.createProduct);

module.exports = router;
