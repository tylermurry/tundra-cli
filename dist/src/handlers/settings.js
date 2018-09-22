"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = require("../services/state");

exports.default = function (request, response) {
  response.status(200).send({
    port: (0, _state.getState)().port,
    fixturesDirectory: (0, _state.getState)().fixturesDirectory
  });
};
//# sourceMappingURL=settings.js.map