'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveRequestsAsProfile = exports.getExistingProfileRequests = exports.PROFILE_DIRECTORY = undefined;

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _state = require('../state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PROFILE_DIRECTORY = exports.PROFILE_DIRECTORY = process.cwd() + '/' + (0, _state.getState)().fixturesDirectory + '/profiles';

var getExistingProfileRequests = exports.getExistingProfileRequests = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(profile) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.t0 = JSON;
            _context.next = 4;
            return _fs2.default.readFileSync(PROFILE_DIRECTORY + '/' + profile + '.json', 'utf-8');

          case 4:
            _context.t1 = _context.sent;
            return _context.abrupt('return', _context.t0.parse.call(_context.t0, _context.t1));

          case 8:
            _context.prev = 8;
            _context.t2 = _context['catch'](0);
            return _context.abrupt('return', []);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function getExistingProfileRequests(_x) {
    return _ref.apply(this, arguments);
  };
}();

var saveRequestsAsProfile = exports.saveRequestsAsProfile = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(requests, profile) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            (0, _mkdirp2.default)(PROFILE_DIRECTORY);
            _context2.next = 3;
            return _fs2.default.writeFileSync(PROFILE_DIRECTORY + '/' + profile + '.json', JSON.stringify(requests, null, 2), 'utf8');

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function saveRequestsAsProfile(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=profile.js.map