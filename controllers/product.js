
const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator')

const Product = require('../models/product');
const User = require('../models/user');

exports.getProduct = async(req, res, next) => {
  const productId = req.params.productId 

  const product = await Product.find({_id:productId})
  const user = await User.findById(product[0].creator)
  res.status(200).json({product,user})
}

exports.deleteProduct = async(req, res, next) => {
  const productId = req.params.productId 
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Couldnt find poduct');
    error.statusCode = 404;
    throw error;
  }
  if(product.creator.toString() !== req.userId){
    const error = new Error('Not allowed');
    error.statusCode = 403;
    throw error;
  }
  const response = await Product.findByIdAndRemove(productId);
  console.log(response)
  res.status(200).json({message:'product deleted'})
}

