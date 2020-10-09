
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  let latestProducts;

  Product.find()
    .limit(12)
    .sort({createdAt: 'desc'})
    .then(products => {
      latestProducts = products
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })

    Product.count().exec(function(err, count){
      let random = Math.floor(Math.random() * count);
      Product.find().limit(5).skip(random).exec(
        function (err, result) {
          res.status(200).json({latestProducts:latestProducts,randomProducts: result})
      });
    });
}
//for future development

// exports.updatePost = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed,entered data is incorrect');
//     error.statusCode = 422;
//     throw error;
//   }
//   const postId = req.params.postId;
//   const content = req.body.title;
//   const title = req.body.content;
//   let imageUrl = req.body.image;
//   if (req.file) {
//     imageUrl = req.file.path;
//   }
//   if (!imageUrl) {
//     const error = new Error('No file picked')
//     error.statusCode = 422;
//     throw error
//   }
//   Post.findById(postId)
//     .then(post => {
//       if (!post) {
//         const error = new Error('Couldnt find post');
//         error.statusCode = 404;
//         throw error;
//       }
//       if(post.creator.toString() !== req.userId){
//         const error = new Error('Not authoriza');
//         error.statusCode = 403;
//         throw error;
//       }
//       if (imageUrl !== post.imageUrl) {
//         clearImage(post.imageUrl);
//       }
//       post.title = tile;
//       post.imageUrl = imageUrl;
//       post.content = content;
//       return post.save()
//     })
//     .then(result => {
//       res.status(200).json({ post: result })
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err)
//     })
// }

// exports.deletePost = (req, res, next) => {
//   const postId = req.params.postId;
//   Post.findById(postId)
//     .then(post => {
//       if (!post) {
//         const error = new Error('Couldnt find post');
//         error.statusCode = 404;
//         throw error;
//       }

//       if(post.creator.toString() !== req.userId){
//         const error = new Error('Not authoriza');
//         error.statusCode = 403;
//         throw error;
//       }
//       //check logged in user
//       clearImage(post.imageUrl);
//       return Post.findByIdAndRemove(postId)
//     })
//     .then(result => {
//      return User.findByI(req.userId);
    
//     })
//     .then(user=>{
//       user.posts.pull(postId);
//       return user.save();
//     })
//     .then(result=>{
//       res.status(200).json({ message: 'Post deleted' })
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err)
//     })
// }

// const clearImage = filePath => {
//   filePath = path.join(__dirname, '..', filePath);
//   fs.unlink(filePath, err => console.log(err));
// }