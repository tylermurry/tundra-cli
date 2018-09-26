'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveRequestsHandler = exports.resetRequestsHandler = exports.handleRequest = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _state = require('../services/state');

var _profile = require('../services/profile');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _socket = require('../services/socket');

var _closestMatch = require('../services/closestMatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var handleRequest = exports.handleRequest = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
    var type, embeddedRequest, embeddedResponse, requestData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = request.params.type ? request.params.type : 'normal';
            embeddedRequest = request.body.request;
            embeddedResponse = request.body.response;


            console.log(_chalk2.default.blue('--> [' + type + '] ' + embeddedRequest.method + ' ' + embeddedRequest.url + ' ') + _chalk2.default.yellow('(' + embeddedResponse.statusCode + ')'));

            requestData = {
              type: type,
              interceptedOn: new Date(),
              data: request.body
            };

            if (!(type === 'unmatched')) {
              _context.next = 11;
              break;
            }

            requestData.reason = request.get("Reason");

            if (!(requestData.reason === "Not Found")) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return (0, _closestMatch.getClosestProfileMatch)(request.body, (0, _state.getState)().debugProfile);

          case 10:
            requestData.closestMatch = _context.sent;

          case 11:

            (0, _socket.sendSocketMessage)(JSON.stringify(requestData));

            (0, _state.setState)({ requests: (0, _state.getState)().requests.concat(requestData) });

            response.status(201).send();

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function handleRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var resetRequestsHandler = exports.resetRequestsHandler = function resetRequestsHandler(request, response) {
  (0, _state.setState)({ requests: [] });

  response.status(200).send();
};

var saveRequestsHandler = exports.saveRequestsHandler = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request, response) {
    var profileName, resetProfile, requests, sortedRequests;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            profileName = request.body.profileName;
            resetProfile = request.body.resetProfile;
            requests = (0, _state.getState)().requests.map(function (request) {
              return request.data;
            });

            if (resetProfile) {
              _context2.next = 12;
              break;
            }

            _context2.t0 = requests.push;
            _context2.t1 = requests;
            _context2.t2 = _toConsumableArray;
            _context2.next = 9;
            return (0, _profile.getExistingProfileRequests)(profileName);

          case 9:
            _context2.t3 = _context2.sent;
            _context2.t4 = (0, _context2.t2)(_context2.t3);

            _context2.t0.apply.call(_context2.t0, _context2.t1, _context2.t4);

          case 12:
            sortedRequests = (0, _lodash2.default)(requests).chain().sortBy('request.method').sortBy('request.url').value();
            _context2.next = 15;
            return (0, _profile.saveRequestsAsProfile)(sortedRequests, profileName);

          case 15:

            console.log(_chalk2.default.green('Captured requests successfully stored as the \'' + profileName + '\' profile'));

            response.status(200).send();

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function saveRequestsHandler(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=requests.js.map