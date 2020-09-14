
const Product = require('../models/product');
const User = require('../models/user');

const { validationResult } = require('express-validator')

exports.getProducts = async (req, res, next) => {
  const profileId = req.params.profileId;
  let totalItems;
  let productsIds;

  const user = await User.findById(profileId)
     productsIds = user.products
     console.log(user)

  Product.find({_id: {$in:productsIds}})
    .then(products => {
      res.status(200).json({ user, products, totalItems })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}
exports.createProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed,entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const category = req.body.category;
  const price = req.body.price;
  const images = req.files;
  let imagesUrl = [];
  let creator = req.userId;
  if (!images) {
    const error = new Error('No image provided');
    error.statusCode = 422;
    throw error;
  }
  images.forEach(element => {
    imagesUrl.push(element.path);
  });

  const product = new Product({
    title,
    content,
    category,
    price,
    creator,
    imagesUrl
  });
  product.save()
    .then((result) => {
      return User.findById(creator);
    })
    .then(user => {
      creator = user;
      user.products.push(product)
      return user.save();
    })
    .then(result => {
      res.status(201).json(product)
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}
