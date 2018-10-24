'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveRequestsAsProfile = exports.getExistingProfileRequests = exports.PROFILE_DIRECTORY = undefined;

var _asyncMkdirp = require('async-mkdirp');

var _asyncMkdirp2 = _interopRequireDefault(_asyncMkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PROFILES = 'profiles';
var FIXTURES_DIRECTORY = function FIXTURES_DIRECTORY() {
  return process.cwd() + '/' + (0, _state.getState)().fixturesDirectory;
};
var PROFILE_DIRECTORY = exports.PROFILE_DIRECTORY = function PROFILE_DIRECTORY() {
  return FIXTURES_DIRECTORY() + '/' + PROFILES;
};

var getExistingProfileRequests = exports.getExistingProfileRequests = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(profile) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.t0 = JSON;
            _context.next = 4;
            return _fs2.default.readFileSync(PROFILE_DIRECTORY() + '/' + profile + '.json', 'utf-8');

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
            _context2.next = 2;
            return (0, _asyncMkdirp2.default)(PROFILE_DIRECTORY());

          case 2:
            _context2.next = 4;
            return _fs2.default.writeFileSync(PROFILE_DIRECTORY() + '/' + profile + '.json', JSON.stringify(requests, null, 2), 'utf8');

          case 4:
            _context2.next = 6;
            return createProfileData();

          case 6:
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

var createProfileData = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var profileDataFilePath, profileDataContent, files;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            profileDataFilePath = FIXTURES_DIRECTORY() + '/profileData.js';
            _context3.prev = 1;
            _context3.next = 4;
            return _fs2.default.unlinkSync('' + profileDataFilePath);

          case 4:
            console.log('successfully deleted ' + profileDataFilePath);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](1);

            console.log('There is no profile data yet!');

          case 10:
            profileDataContent = '';
            _context3.next = 13;
            return _fs2.default.readdirSync(PROFILE_DIRECTORY());

          case 13:
            files = _context3.sent;

            files.forEach(function (file) {
              var profileName = _path2.default.basename(file, '.json');
              profileDataContent += 'export const ' + profileName.toLowerCase() + ' = () => require(\'./' + PROFILES + '/' + profileName + '\');\n\n';
            });

            _context3.next = 17;
            return _fs2.default.writeFileSync(profileDataFilePath, profileDataContent);

          case 17:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 7]]);
  }));

  return function createProfileData() {
    return _ref3.apply(this, arguments);
  };
}();
//# sourceMappingURL=profile.js.map