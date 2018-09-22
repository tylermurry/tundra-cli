#!/usr/bin/env node
import program from 'commander';
import {start} from './src/server';
import { getState } from './src/state';

program
  .option('-p, --port <port>', 'The port to listen on')
  .option('-f, --fixtures-directory <fixturesDirectory>', 'The directory of the fixtures folder that contains the data profiles')
  .parse(process.argv);

start(
    program.port ? program.port : getState().port,
    program.fixturesDirectory ? program.fixturesDirectory : getState().fixturesDirectory
);
