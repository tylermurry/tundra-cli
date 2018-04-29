#!/usr/bin/env node
'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _tundraServer = require('./tundra-server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.option('-p, --port <port>', 'The port to listen on').option('-d, --profile <profile>', 'The data profile to use while capturing').option('-f, --fixtures-directory <fixturesDirectory>', 'The directory of the fixtures folder that contains the data profiles').option('-r, --reset-profile', 'If specified, the existing profile will be overwritten with the current data capture').parse(process.argv);

if (!_commander2.default.profile) {
    console.log(_chalk2.default.red("Data profile must be specified. Use --help for more information"));
} else {
    if (_commander2.default.resetProfile) {
        console.log(_chalk2.default.blue('Data for the ' + _commander2.default.profile + ' profile will be overwritten.'));
    }

    (0, _tundraServer.listenForRequests)(_commander2.default.port ? _commander2.default.port : 9090, _commander2.default.profile, _commander2.default.fixturesDirectory ? _commander2.default.fixturesDirectory : "fixtures", _commander2.default.resetProfile);
}
//# sourceMappingURL=index.js.map