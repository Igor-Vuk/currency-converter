'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// use promises
_mongoose2.default.Promise = global.Promise;

if (process.env.NODE_ENV === 'development') {
  _mongoose2.default.connect('mongodb://localhost:27017/ConverterApp');
} else {
  _mongoose2.default.connect('mongodb://igor:Ul3&Bzo9mQ@ds117311.mlab.com:17311/currency_converter');
}

module.exports = {
  mongoose: _mongoose2.default
};
//# sourceMappingURL=mongoose.js.map