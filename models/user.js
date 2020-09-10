
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'New'
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  wishList:[{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

module.exports = mongoose.model('User',userSchema)