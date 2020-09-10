
const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator')

const Product = require('../models/product');
const User = require('../models/user');

exports.addWishList = async(req, res, next) => {
  // const productId = req.params.productId 
  const productId = '5f573c7d7a3d7f23509b52ff';


  const user = await User.findOne({_id: '5f4f80bfe07dfacbf060cfef'})
  const product = await Product.findOne({_id: '5f573c7d7a3d7f23509b52ff'})

  user.wishList.push(product._id);
  user.save();
  res.status(200).json()
}

exports.getWishList = async(req, res, next) => {
  const userId = req.userId
  let wishListProductsIds;
  const user = await User.findById(userId)
  wishListProductsIds = user.wishList

  Product.find({_id: {$in:wishListProductsIds}})
    .then(products => {
      res.status(200).json( products )
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}