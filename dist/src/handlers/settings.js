"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = require("../services/state");

exports.default = function (request, response) {
  var _getState = (0, _state.getState)(),
      port = _getState.port,
      socketPort = _getState.socketPort,
      fixturesDirectory = _getState.fixturesDirectory;

  response.status(200).send({ port: port, socketPort: socketPort, fixturesDirectory: fixturesDirectory });
};
//# sourceMappingURL=settings.js.map