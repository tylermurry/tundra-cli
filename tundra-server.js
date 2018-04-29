import prompt from 'co-prompt';
import co from 'co';
import 'babel-polyfill';
import chalk from 'chalk';
import express from 'express';
import bodyParser from 'body-parser';
import mkdirp from "mkdirp";
import fs from 'fs';
import _ from 'lodash';

export const listenForRequests = async (port, profile, fixturesDirectory, resetProfile) => {
    const server = express();
    server.use(bodyParser.json());

    let requests = [];

    server.post('/requests', (request, response) => {

        const embeddedRequest = request.body.request;
        const embeddedResponse = request.body.response;

        console.log(chalk.blue(`--> ${embeddedRequest.method} ${embeddedRequest.url} `) + chalk.yellow(`(${embeddedResponse.statusCode})`));

        requests.push(request.body);
        response.sendStatus(201);
    });

    server.listen(port, () => console.log(chalk.green(`Listening for requests on http://localhost:${port}/requests`)));

    await waitForStopCommand(async () => {

        if (!resetProfile)
            requests.push(...await getExistingProfileRequests(profile, fixturesDirectory));

        const sortedRequests = _(requests).chain()
            .sortBy('request.method')
            .sortBy('request.url')
            .value();

        await saveRequestsAsProfile(sortedRequests, profile, fixturesDirectory);

        console.log(chalk.green('Profile successfully captured!'));
        process.exit()
    });
};

const getExistingProfileRequests = async(profile, fixturesDirectory) => {
    try {
        return JSON.parse(await fs.readFileSync(`${process.cwd()}/${fixturesDirectory}/profiles/${profile}.json`, 'utf-8'));
    } catch (e) {
        return [];
    }
};

const saveRequestsAsProfile = async function(requests, profile, fixturesDirectory) {
    const profilesDirectory = `${process.cwd()}/${fixturesDirectory}/profiles`;

    mkdirp(profilesDirectory);
    await fs.writeFileSync(`${profilesDirectory}/${profile}.json`, JSON.stringify(requests, null, 2), 'utf8');
};

function waitForStopCommand(actionCallback) {
    co(function *() {
        while (!((yield prompt('')).toUpperCase().trim() === 'STOP'));
        actionCallback();
    });
}