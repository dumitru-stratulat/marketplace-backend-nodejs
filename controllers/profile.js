

const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = async (req, res, next) => {
  const profileId = req.params.profileId
  let totalItems;
  let productsIds;

  const user = await User.findById(profileId)
     productsIds = user.products

  Product.find({_id: {$in:productsIds}})
    .then(products => {
      console.log(products)
      res.status(200).json({ products, totalItems })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}