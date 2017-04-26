// Imports
import Express from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import mongoose from './db/mongoose'
import conf from './conf'
import Exchange from './models/exchange'

const APP_PORT = conf.APP_PORT
const PORT = process.env.PORT || APP_PORT
const app = new Express()

// Configure current Date
const dateObj = new Date()
const month = dateObj.getUTCMonth() + 1
const day = dateObj.getUTCDate()
const year = dateObj.getUTCFullYear()
const newDate = year + '.' + month + '.' + day + '.'
const date = newDate

// Configure Multer save destination and custom filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, date + '(' + Date.now() + ')' + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

// Middleware
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(Express.static(path.join(__dirname, '../', 'dist')))

// Routes
// -----------------------

// keeps the name of the last uploaded file
var uploadedFileName = ''

// GET ROUTE
app.get('/exchange', (req, res) => {
  Exchange.find({'name': uploadedFileName}, (err, AllFiles) => {
    if (err) {
      console.log(err)
    } else {
      if (AllFiles.length > 0) {
        res.send(AllFiles)
      }
    }
  })
})

// POST ROUTE
app.post('/exchange', upload.single('file'), (req, res, next) => {
  const readFile = fs.readFileSync(req.file.path, 'utf8')
  uploadedFileName = req.file.filename
  const parseFile = JSON.parse(readFile)

  parseFile.exchange.map(fullExchange => {
    // save to mongodb
    const newExchange = new Exchange()
    newExchange.currency = fullExchange.currency
    newExchange.amount = fullExchange.amount
    newExchange.name = req.file.filename
    newExchange.date = date
    newExchange.save()
  })
  // send response after done saving to mongo
  res.send('response')
})

app.get('*', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Express server is up on port ${PORT}`)
})
