'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mongoose Model
var Exchange = _mongoose2.default.model('Exchange', {
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
});

exports.default = Exchange;
//# sourceMappingURL=exchange.js.map