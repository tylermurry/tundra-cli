'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveRequestsHandler = exports.resetRequestsHandler = exports.handleUnmatchedRequest = exports.handlePartiallyMatchedRequest = exports.handleMatchedRequest = exports.handleRequest = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _state = require('../services/state');

var _profile = require('../services/profile');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _socket = require('../services/socket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var handleRequest = exports.handleRequest = function handleRequest(request, response) {
  return handle('normal', request, response);
};
var handleMatchedRequest = exports.handleMatchedRequest = function handleMatchedRequest(request, response) {
  return handle('matched', request, response);
};
var handlePartiallyMatchedRequest = exports.handlePartiallyMatchedRequest = function handlePartiallyMatchedRequest(request, response) {
  return handle('partially-matched', request, response);
};
var handleUnmatchedRequest = exports.handleUnmatchedRequest = function handleUnmatchedRequest(request, response) {
  return handle('unmatched', request, response);
};

var handle = function handle(type, request, response) {
  var embeddedRequest = request.body.request;
  var embeddedResponse = request.body.response;

  console.log(_chalk2.default.blue('--> [' + type + '] ' + embeddedRequest.method + ' ' + embeddedRequest.url + ' ') + _chalk2.default.yellow('(' + embeddedResponse.statusCode + ')'));

  var requestData = {
    type: type,
    interceptedOn: new Date(),
    data: request.body
  };

  (0, _socket.sendSocketMessage)(JSON.stringify(requestData));

  (0, _state.setState)({ requests: (0, _state.getState)().requests.concat(requestData) });

  response.status(201).send();
};

var resetRequestsHandler = exports.resetRequestsHandler = function resetRequestsHandler(request, response) {
  (0, _state.setState)({ requests: [] });

  response.status(200).send();
};

var saveRequestsHandler = exports.saveRequestsHandler = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
    var profileName, resetProfile, requests, sortedRequests;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            profileName = request.body.profileName;
            resetProfile = request.body.resetProfile;
            requests = (0, _state.getState)().requests.map(function (request) {
              return request.data;
            });

            if (resetProfile) {
              _context.next = 12;
              break;
            }

            _context.t0 = requests.push;
            _context.t1 = requests;
            _context.t2 = _toConsumableArray;
            _context.next = 9;
            return (0, _profile.getExistingProfileRequests)(profileName);

          case 9:
            _context.t3 = _context.sent;
            _context.t4 = (0, _context.t2)(_context.t3);

            _context.t0.apply.call(_context.t0, _context.t1, _context.t4);

          case 12:
            sortedRequests = (0, _lodash2.default)(requests).chain().sortBy('request.method').sortBy('request.url').value();
            _context.next = 15;
            return (0, _profile.saveRequestsAsProfile)(sortedRequests, profileName);

          case 15:

            console.log(_chalk2.default.green('Captured requests successfully stored as the \'' + profileName + '\' profile'));

            response.status(200).send();

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function saveRequestsHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=requests.js.map