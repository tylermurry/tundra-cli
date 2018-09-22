'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelCaptureHandler = exports.startCaptureHandler = undefined;

var _state = require('../state');

var _profile = require('../services/profile');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startCaptureHandler = exports.startCaptureHandler = function startCaptureHandler(request, response) {
  (0, _state.setState)({ requests: [], capturing: true });

  response.status(200).send();
};

var cancelCaptureHandler = exports.cancelCaptureHandler = function cancelCaptureHandler(request, response) {
  (0, _state.setState)({ requests: [], capturing: false });

  response.status(200).send();
};
//# sourceMappingURL=capture.js.map