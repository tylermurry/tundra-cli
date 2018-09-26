'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _profile = require('../services/profile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
    var profiles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            profiles = [];
            _context.next = 4;
            return _fs2.default.existsSync(_profile.PROFILE_DIRECTORY);

          case 4:
            if (!_context.sent) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return _fs2.default.readdirSync(_profile.PROFILE_DIRECTORY).map(function (file) {
              return file.split('.').slice(0, -1).join('.');
            });

          case 7:
            profiles = _context.sent;

          case 8:

            response.status(200).send(profiles);
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);
            response.status(500).send("There was a problem getting the profiles");

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=profiles.js.map