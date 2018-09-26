'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Default State
var state = {
  port: 9091,
  socketPort: null,
  fixturesDirectory: 'fixtures',
  requests: [],
  debugProfile: null
};

var setState = exports.setState = function setState(newState) {
  state = _extends({}, state, newState);
};

var getState = exports.getState = function getState() {
  return state;
};
//# sourceMappingURL=state.js.map