/* @flow */

import Express from 'express'
import path from 'path'
import mongoose from './db/mongoose'
/* import bodyParser from 'body-parser' */
import multer from 'multer'
import conf from './conf'

const upload = multer({ dest: 'uploads/' })

const APP_PORT: number = conf.APP_PORT
const PORT: any = process.env.PORT || APP_PORT

const app: Express = new Express()

// Middleware
/*
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
*/
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(Express.static(path.join(__dirname, '../', 'dist')))

// Routes


/* app.get('/exchanges', (req, res) => {
  res.render('exchange')
}) */

app.post('/exchange', upload.single('file'), function (req, res, next) {
  var prob = req.file
  console.log(prob)
})

app.get('*', function (req: Object, res: Object) {
  res.render('index')
})

app.listen(PORT, function () {
  console.log(`Express server is up on port ${PORT}`)
})
