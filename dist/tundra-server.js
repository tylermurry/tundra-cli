'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listenForRequests = undefined;

var _coPrompt = require('co-prompt');

var _coPrompt2 = _interopRequireDefault(_coPrompt);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

require('babel-polyfill');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var listenForRequests = exports.listenForRequests = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(port, profile, fixturesDirectory) {
        var server, requests;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        server = (0, _express2.default)();

                        server.use(_bodyParser2.default.json());

                        requests = [];


                        server.post('/requests', function (request, response) {

                            var embeddedRequest = request.body.request;
                            var embeddedResponse = request.body.response;

                            console.log(_chalk2.default.blue('--> ' + embeddedRequest.method + ' ' + embeddedRequest.url + ' ') + _chalk2.default.yellow('(' + embeddedResponse.statusCode + ')'));

                            requests.push(request.body);
                            response.sendStatus(201);
                        });

                        server.listen(port, function () {
                            return console.log(_chalk2.default.green('Listening for requests on http://localhost:' + port + '/requests'));
                        });

                        _context2.next = 7;
                        return waitForStopCommand(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            var sortedRequests;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            sortedRequests = (0, _lodash2.default)(requests).chain().sortBy('request.method').sortBy('request.url').value();
                                            _context.next = 3;
                                            return saveRequestsAsProfile(sortedRequests, profile, fixturesDirectory);

                                        case 3:

                                            console.log(_chalk2.default.green('Profile successfully captured!'));
                                            process.exit();

                                        case 5:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined);
                        })));

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function listenForRequests(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var saveRequestsAsProfile = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(requests, profile, fixturesDirectory) {
        var profilesDirectory;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        profilesDirectory = process.cwd() + '/' + fixturesDirectory + '/profiles';


                        (0, _mkdirp2.default)(profilesDirectory);
                        _context3.next = 4;
                        return _fs2.default.writeFileSync(profilesDirectory + '/' + profile + '.json', JSON.stringify(requests, null, 2), 'utf8');

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function saveRequestsAsProfile(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

function waitForStopCommand(actionCallback) {
    (0, _co2.default)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return (0, _coPrompt2.default)('');

                    case 2:
                        _context4.t0 = _context4.sent.toUpperCase().trim();

                        if (_context4.t0 === 'STOP') {
                            _context4.next = 6;
                            break;
                        }

                        _context4.next = 0;
                        break;

                    case 6:
                        actionCallback();

                    case 7:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
}
//# sourceMappingURL=tundra-server.js.map