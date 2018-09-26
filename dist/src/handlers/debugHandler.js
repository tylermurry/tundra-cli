'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopDebuggingRequest = exports.startDebuggingRequest = undefined;

var _state = require('../services/state');

var startDebuggingRequest = exports.startDebuggingRequest = function startDebuggingRequest(request, response) {
  (0, _state.setState)({ debugProfile: request.params.profileName });

  response.status(200).send();
};

var stopDebuggingRequest = exports.stopDebuggingRequest = function stopDebuggingRequest(request, response) {
  (0, _state.setState)({ debugProfile: null });

  response.status(200).send();
};
//# sourceMappingURL=debugHandler.js.map