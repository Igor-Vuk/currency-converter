import mongoose from 'mongoose'

// Mongoose Model
var Exchange = mongoose.model('Exchange', {
  currency: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  date: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})

export default Exchange
