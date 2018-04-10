#!/usr/bin/env node
import chalk from 'chalk';
import program from 'commander';
import {listenForRequests} from './tundra-server';

program
    .option('-p, --port <port>', 'The port to listen on')
    .option('-d, --profile <profile>', 'The data profile to use while capturing')
    .option('-f, --fixtures-directory <fixturesDirectory>', 'The directory of the fixtures folder that contains the data profiles')
    .parse(process.argv);

if (!program.profile) {
    console.log(chalk.red("Data profile must be specified. Use --help for more information"));
}
else {
    listenForRequests(
        program.port ? program.port : 9090,
        program.profile,
        program.fixturesDirectory ? program.fixturesDirectory : "fixtures"
    );
}