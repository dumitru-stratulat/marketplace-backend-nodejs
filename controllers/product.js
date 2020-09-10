
const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator')

const Product = require('../models/product');
const User = require('../models/user');

exports.getProduct = async(req, res, next) => {
  const productId = req.params.productId 

  const product = await Product.find({_id:productId})
  res.status(200).json(product)
}

