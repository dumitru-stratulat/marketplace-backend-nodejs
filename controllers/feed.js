
const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator')

const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  let productsIds;
  User.findById('5f4f80bfe07dfacbf060cfef')
  .then(user=>{
    productsIds = user.products
  })
  Product.find({_id: {$in:productsIds}})
    .countDocuments({_id: {$in:productsIds}})
    .then(count => {
      totalItems = count;
      return Product.find({_id: {$in:productsIds}})
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(products => {
      res.status(200).json({ products, totalItems })
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
  // if (!req.file) {
  //   const error = new Error('No image provided');
  //   error.statusCode = 422;
  //   throw error;
  // }
  // const imageUrl = req.file.path;
  const imageUrl = 'hardcoded'
  const title = req.body.title;
  const content = req.body.content;
  let creator;

  const product = new Product({
    title,
    content,
    // creator: req.userId,
    creator: '5f4cf0d78a80368a276c69e7',
    imageUrl: imageUrl
  });
  product.save()
    .then((result) => {
      // return User.findById(req.userId);
      return User.findById('5f4f80bfe07dfacbf060cfef');
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

exports.getPost = (req, res, next) => {
  const postId = req.params.postId
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Couldnt find post');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err)
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed,entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }
  const postId = req.params.postId;
  const content = req.body.title;
  const title = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked')
    error.statusCode = 422;
    throw error
  }
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Couldnt find post');
        error.statusCode = 404;
        throw error;
      }
      if(post.creator.toString() !== req.userId){
        const error = new Error('Not authoriza');
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      post.title = tile;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save()
    })
    .then(result => {
      res.status(200).json({ post: result })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Couldnt find post');
        error.statusCode = 404;
        throw error;
      }

      if(post.creator.toString() !== req.userId){
        const error = new Error('Not authoriza');
        error.statusCode = 403;
        throw error;
      }
      //check logged in user
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId)
    })
    .then(result => {
     return User.findByI(req.userId);
    
    })
    .then(user=>{
      user.posts.pull(postId);
      return user.save();
    })
    .then(result=>{
      res.status(200).json({ message: 'Post deleted' })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
}