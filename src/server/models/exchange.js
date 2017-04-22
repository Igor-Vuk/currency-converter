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
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})

module.exports = {Exchange}
