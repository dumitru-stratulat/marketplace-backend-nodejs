
const AWS = require('aws-sdk');

const config = require('../config/config')

const BUCKET_NAME = 'outfit.md';
const IAM_USER_KEY = 'AKIA3XZ54QING7UO22EM';
const IAM_USER_SECRET = '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';

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function () {

    var params = {
      Bucket: BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
    });
  });
}


const Product = require('../models/product');
const User = require('../models/user');

const { validationResult } = require('express-validator')

exports.getProducts = async (req, res, next) => {
  const profileId = req.params.profileId;
  const currentPage = req.query.page*1 || 1;

  let totalItems;
  let productsId;
  const productsPerPage = 20;
  try {
    const user = await User.findById(profileId)
    productsId = user.products

    const count = await Product.find({ _id: { $in: productsId } })
      .countDocuments()

    const products = await Product.find({ _id: { $in: productsId } })
      .skip((currentPage - 1) * productsPerPage)
      .limit(productsPerPage)
let foo = 'sd';
    res.status(200).json({data:products,user,totalItems:count,currentPage})
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err)
  }
}
  exports.createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed,entered data is incorrect');
      error.statusCode = 422;
      throw error;
    }
    const title = req.body.title;
    const condition = req.body.condition;
    const content = req.body.content;
    const category = req.body.category;
    const size = req.body.size;
    const price = req.body.price;
    const contactNumber = req.body.contactNumber;
    const images = req.files;
    var imagesUrl = [];
    let creator = req.userId;

    if (!images) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      throw error;
    }

    await images.forEach(async (element) => {
      await uploadToS3(element)
      imagesUrl.push(element.originalname);
    })

    const product = new Product({
      title,
      content,
      category,
      price,
      condition,
      size,
      contactNumber,
      creator,
      imagesUrl,
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
