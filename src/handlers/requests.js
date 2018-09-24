import chalk from 'chalk';
import { getState, setState } from '../services/state';
import { getExistingProfileRequests, saveRequestsAsProfile } from '../services/profile';
import _ from 'lodash';
import { sendSocketMessage } from '../services/socket';

export const handleRequest = (request, response) => handle('normal', request, response);
export const handleMatchedRequest = (request, response) => handle('matched', request, response);
export const handlePartiallyMatchedRequest = (request, response) => handle('partially-matched', request, response);
export const handleUnmatchedRequest = (request, response) => handle('unmatched', request, response);

const handle = (type, request, response) => {
  const embeddedRequest = request.body.request;
  const embeddedResponse = request.body.response;

  console.log(chalk.blue(`--> [${type}] ${embeddedRequest.method} ${embeddedRequest.url} `) + chalk.yellow(`(${embeddedResponse.statusCode})`));

  const requestData = {
    type,
    interceptedOn: new Date(),
    data: request.body
  };

  sendSocketMessage(JSON.stringify(requestData));

  setState({ requests: getState().requests.concat(requestData) });

  response.status(201).send();
};

export const resetRequestsHandler = (request, response) => {
  setState({ requests: [] });

  response.status(200).send();
};

export const saveRequestsHandler = async (request, response) => {
  const profileName = request.body.profileName;
  const resetProfile = request.body.resetProfile;

  let requests = getState().requests.map(request => request.data);

  if (!resetProfile)
    requests.push(...await getExistingProfileRequests(profileName));

  const sortedRequests = _(requests).chain()
    .sortBy('request.method')
    .sortBy('request.url')
    .value();

  await saveRequestsAsProfile(sortedRequests, profileName);

  console.log(chalk.green(`Captured requests successfully stored as the \'${profileName}\' profile`));

  response.status(200).send();
};


