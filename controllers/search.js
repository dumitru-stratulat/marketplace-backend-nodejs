
const Product = require('../models/product');

exports.searchProduct = async(req, res, next) => {
  const currentPage = req.query.page*1 || 1;
  console.log(currentPage)
  const productsPerPage = 20;
  const query = req.query.q;
  let queries = query.split(' ');

  const count = [
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
    },
    {'$count': 'totalItems'}
  ]
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
  }, 
  { '$skip' : (currentPage-1) * productsPerPage },
  {'$limit':productsPerPage},
]
try{ 
    const products = await Product.aggregate(q);
    const totalItems = await Product.aggregate(count);

    res.status(200).json({data:products,totalItems:totalItems[0].totalItems,currentPage})

  }catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    }
}
