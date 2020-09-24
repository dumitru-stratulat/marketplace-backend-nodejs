
const Product = require('../models/product');

exports.searchProduct = async(req, res, next) => {
  const query = req.query.q;
  let queries = query.split(' ');

 const q = [
  {
    '$search': {
      'compound': {
        'should': [
          {
            'text': {
              'query': `${queries}`, 
              'path': 'title'
            }
          }, {
            'text': {
              'query': `${queries}`, 
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
    res.status(200).json(search)

  }catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    }
}
