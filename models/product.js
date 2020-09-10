
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  imagesUrl: [{
    type: String,
    required: true
  }],
  content:{
    type: String,
    required: true
  },
  category:[{
    type: String,
    required: true
  }],
  price:{
    type: Number,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{timestamps: true});

module.exports = mongoose.model('Product', productSchema);