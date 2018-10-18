#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _server = require('./src/server');

var _state = require('./src/services/state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-p, --port <port>', 'The port to listen on').option('-f, --fixtures-directory <fixturesDirectory>', 'The directory of the fixtures folder that contains the data profiles').parse(process.argv);

(0, _server.start)(_commander2.default.port ? _commander2.default.port : (0, _state.getState)().port, _commander2.default.fixturesDirectory ? _commander2.default.fixturesDirectory : (0, _state.getState)().fixturesDirectory);
//# sourceMappingURL=index.js.map