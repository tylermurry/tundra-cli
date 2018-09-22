'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.sendSocketMessage = undefined;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _getPort = require('get-port');

var _getPort2 = _interopRequireDefault(_getPort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var socket = null;

var sendSocketMessage = exports.sendSocketMessage = function sendSocketMessage(message) {
  if (socket) {
    socket.send(message);
  } else {
    console.error('Could not send message. Socket connection not established.');
  }
};

var init = exports.init = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var port, wss;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getPort2.default)();

          case 2:
            port = _context.sent;
            wss = new _ws2.default.Server({ port: port });


            wss.on('connection', function (ws) {
              socket = ws;
              console.log('Socket connection established with client');
            });

            return _context.abrupt('return', port);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=socket.js.map