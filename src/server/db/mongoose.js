import mongoose from 'mongoose'

// use promises
mongoose.Promise = global.Promise

if (process.env.NODE_ENV !== 'development') {
  mongoose.connect('process.env.DATABASE_URL')
} else {
  mongoose.connect('mongodb://localhost:27017/ConverterApp')
}

module.exports = {
  mongoose: mongoose
}
