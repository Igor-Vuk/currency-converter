'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _app = require('../../../conf/app.json');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDev = process.env.NODE_ENV === 'development';
var localConf = isDev ? require('../../../conf/app.local.json') : {};

var conf = (0, _extends3.default)({}, _app2.default, localConf);

exports.default = conf;
//# sourceMappingURL=index.js.map