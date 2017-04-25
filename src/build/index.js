'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _mongoose = require('./db/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

var _exchange = require('./models/exchange');

var _exchange2 = _interopRequireDefault(_exchange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APP_PORT = _conf2.default.APP_PORT; // Imports

var PORT = process.env.PORT || APP_PORT;
var app = new _express2.default();

// Configure current Date
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var newDate = year + '.' + month + '.' + day + '.';
var date = newDate;

// Configure Multer save destination and custom filename
var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, date + '(' + Date.now() + ')' + '-' + file.originalname);
  }
});
var upload = (0, _multer2.default)({ storage: storage });

// Middleware
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(_express2.default.static(_path2.default.join(__dirname, '../', 'dist')));

// Routes
// -----------------------

// keeps the name of the last uploaded file
var uploadedFileName = '';

// GET ROUTE
app.get('/exchange', function (req, res) {
  _exchange2.default.find({ 'name': uploadedFileName }, function (err, AllFiles) {
    if (err) {
      console.log(err);
    } else {
      if (AllFiles.length > 0) {
        res.send(AllFiles);
      }
    }
  });
});

// POST ROUTE
app.post('/exchange', upload.single('file'), function (req, res, next) {
  var readFile = _fs2.default.readFileSync(req.file.path, 'utf8');
  uploadedFileName = req.file.filename;
  var parseFile = JSON.parse(readFile);

  parseFile.exchange.map(function (fullExchange) {
    // save to mongodb
    var newExchange = new _exchange2.default();
    newExchange.currency = fullExchange.currency;
    newExchange.amount = fullExchange.amount;
    newExchange.name = req.file.filename;
    newExchange.date = date;
    newExchange.save();
  });
  // send response after done saving to mongo
  res.send('response');
});

app.get('*', function (req, res) {
  res.render('index');
});

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
//# sourceMappingURL=index.js.map