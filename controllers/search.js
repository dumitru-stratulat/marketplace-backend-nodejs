
const Product = require('../models/product');

exports.searchProduct = async(req, res, next) => {
 const q = [
  {
    '$search': {
      'compound': {
        'should': [
          {
            'text': {
              'query': 'book', 
              'path': 'title'
            }
          }, {
            'text': {
              'query': 'saf', 
              'path': 'content'
            }
          }
        ]
      }
    }
  }
]
try{ 
    const search = await Product.aggregate(q)
    console.log('search',search)

  }catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    }
}
