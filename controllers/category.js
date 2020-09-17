
const Product = require('../models/product');

exports.getProductsByCategory = async(req, res, next) => {
  const currentPage = req.query.page || 1;
  const gender = req.params.gender;
  const subCategory = req.params.subCategory;
  const productsPerPage = 20;
try{ 
  const count = await Product.find({'category':{$in:[gender,subCategory]}})
  .countDocuments()

  const products = await Product.find({'category':{$in:[gender,subCategory]}})
    .skip((currentPage-1) * productsPerPage)
    .limit(productsPerPage)
    res.status(200).json({products,totalItems: count})
  }catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    }
}
