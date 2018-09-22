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

var _settings = require('./handlers/settings');

var _settings2 = _interopRequireDefault(_settings);

var _profiles = require('./handlers/profiles');

var _profiles2 = _interopRequireDefault(_profiles);

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var start = exports.start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(port, fixturesDirectory) {
    var server;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            (0, _state.setState)({ port: port, fixturesDirectory: fixturesDirectory });

            server = (0, _express2.default)();

            // Settings

            server.use(_bodyParser2.default.json());

            // Routes
            server.delete('/requests', _requests.resetRequestsHandler);
            server.post('/requests', _requests.handleRequest);
            server.post('/requests/matched', _requests.handleMatchedRequest);
            server.post('/requests/partially-matched', _requests.handlePartiallyMatchedRequest);
            server.post('/requests/unmatched', _requests.handleUnmatchedRequest);
            server.post('/requests/save', _requests.saveRequestsHandler);

            server.get('/settings', _settings2.default);

            server.get('/profiles', _profiles2.default);

            // Console
            server.use('/console', _express2.default.static('console/build'));

            server.listen(port, function () {
              return console.log(_chalk2.default.green('Tundra server started. Console available at http://localhost:' + port + '/console.'));
            });

          case 13:
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