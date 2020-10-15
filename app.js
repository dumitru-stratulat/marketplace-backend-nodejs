
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer  = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const productRoutes = require('./routes/product');
const wishListRoutes = require('./routes/wishList');
const categoryRoutes = require('./routes/category');
const searchRoutes = require('./routes/search');
const userRoutes = require('./routes/user');

const app = express();

const fileStorage = multer.memoryStorage()

const fileFilter = (req,file,cb) =>{
  if( file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'  ||
      file.mimetype === 'image/jpeg'
  ){
    cb(null,true)
  }else{
    cb(null,false)
  }
}
app.use(bodyParser({limit: '10mb'}));
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter}).array('image[]',5))
app.use('/images',express.static(path.join(__dirname,'images')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})
app.use(feedRoutes)
app.use(authRoutes)
app.use(profileRoutes)
app.use(productRoutes)
app.use(wishListRoutes)
app.use(categoryRoutes)
app.use(searchRoutes)
app.use(userRoutes)

app.use((error,req,res,next)=>{
  console.log(error)
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message, data})
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-none3.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`)
  .then(result => {
    app.listen(app.listen(process.env.PORT || 8081))
  })
  .catch(err => console.log(err))
