
const express = require('express');
const { body } = require('express-validator/check')

const User = require('../models/user');
const authController = require('../controllers/auth')

const router = express.Router();

router.post('/signup',[
  body('email')
  .isEmail()
  .withMessage('Enter valid email')
  .custom((value,{req}) =>{
    return User.findOne({email: value})
    .then(userDoc=>{
      if(userDoc){
        return Promise.reject('E-mail addres already exists!')
      }
    })
  }),
  body('password')
  .trim()
  .isLength({min: 5}),
  body('username')
  .trim()
  .not()
  .isEmpty()
],authController.signup);

router.post('/login',authController.login);

module.exports = router;