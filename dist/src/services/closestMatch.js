"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClosestProfileMatches = exports.SIMILARITY_THRESHOLD = undefined;

var _profile = require("./profile");

var _stringSimilarity = require("string-similarity");

var _stringSimilarity2 = _interopRequireDefault(_stringSimilarity);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SIMILARITY_THRESHOLD = exports.SIMILARITY_THRESHOLD = 0.75;

var getClosestProfileMatches = exports.getClosestProfileMatches = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(originalRequest, profileName) {
    var requests, matches;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _profile.getExistingProfileRequests)(profileName);

          case 2:
            requests = _context.sent;
            matches = [];

            // Calculate the similarity for the URL of each request

            requests.forEach(function (request) {
              var similarity = _stringSimilarity2.default.compareTwoStrings(originalRequest.request.url, request.request.url);

              if (similarity > SIMILARITY_THRESHOLD) matches.push({ similarity: similarity, request: request });
            });

            return _context.abrupt("return", (0, _lodash2.default)(matches).chain().sortBy('similarity').value().reverse());

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getClosestProfileMatches(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=closestMatch.js.map