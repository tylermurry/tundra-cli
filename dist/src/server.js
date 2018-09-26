'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _requests = require('./handlers/requests');

var _debugHandler = require('./handlers/debugHandler');

var _settings = require('./handlers/settings');

var _settings2 = _interopRequireDefault(_settings);

var _profiles = require('./handlers/profiles');

var _profiles2 = _interopRequireDefault(_profiles);

var _state = require('./services/state');

var _socket = require('./services/socket');

var Socket = _interopRequireWildcard(_socket);

var _opn = require('opn');

var _opn2 = _interopRequireDefault(_opn);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var start = exports.start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(port, fixturesDirectory) {
    var server, socketPort;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            server = (0, _express2.default)();

            // Middleware

            server.use((0, _cors2.default)());
            server.use(_bodyParser2.default.json());

            // Console
            server.use(_express2.default.static('console/build'));

            // Routes
            server.delete('/requests', _requests.resetRequestsHandler);
            server.post('/requests', _requests.handleRequest);
            server.post('/requests/:type', _requests.handleRequest);
            server.post('/requests/save', _requests.saveRequestsHandler);

            server.get('/settings', _settings2.default);

            server.post('/debug/profile/:profileName', _debugHandler.startDebuggingRequest);
            server.delete('/debug', _debugHandler.stopDebuggingRequest);

            server.get('/profiles', _profiles2.default);

            server.listen(port, function () {
              return console.log(_chalk2.default.green('Tundra server started. Console available at http://localhost:' + port + '.'));
            });

            // Websocket Server
            _context.next = 15;
            return Socket.init();

          case 15:
            socketPort = _context.sent;


            console.log('Socket started on port ' + socketPort + '. Waiting for client to join...');

            (0, _state.setState)({ port: port, socketPort: socketPort, fixturesDirectory: fixturesDirectory });

            // Launch Console
            console.log('Launching console...');
            (0, _opn2.default)('http://localhost:' + port);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function start(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=server.js.map