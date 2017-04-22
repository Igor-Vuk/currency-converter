/* @flow */

import Express from 'express'
import path from 'path'
import mongoose from './db/mongoose'
/* import bodyParser from 'body-parser' */
import multer from 'multer'
import conf from './conf'
import fs from 'fs'
import Exchange from './models/exchange'

const APP_PORT: number = conf.APP_PORT
const PORT: any = process.env.PORT || APP_PORT
const app: Express = new Express()


var dateObj = new Date()
var month = dateObj.getUTCMonth() + 1
var day = dateObj.getUTCDate()
var year = dateObj.getUTCFullYear()
var newdate = year + '.' + month + '.' + day
var date = newdate + '(' + Date.now() + ')' + '-'


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, date + file.originalname)
  }
})


const upload = multer({ storage: storage })



// Middleware
/*
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
*/
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(Express.static(path.join(__dirname, '../', 'dist')))

// Routes


app.get('/exchange', (req, res) => {
  Exchange.find({}, function (err, AllFiles) {
    if (err) {
      console.log(err)
    } else {
      res.send(AllFiles)
    }
  })
})

app.post('/exchange', upload.single('file'), function (req, res, next) {
  const readFile = fs.readFileSync(req.file.path, 'utf8')
  console.log(req.file)
  const parseFile = JSON.parse(readFile)

  parseFile.exchange.map(function (fullExchange) {
    var newExchange = new Exchange()
    newExchange.currency = fullExchange.currency
    newExchange.amount = fullExchange.amount
    newExchange.date = req.file.filename
    newExchange.save()
  })
})

app.get('*', function (req: Object, res: Object) {
  res.render('index')
})

app.listen(PORT, function () {
  console.log(`Express server is up on port ${PORT}`)
})
