import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import {
  handleMatchedRequest,
  handlePartiallyMatchedRequest,
  handleRequest,
  handleUnmatchedRequest, resetRequestsHandler, saveRequestsHandler
} from './handlers/requests';
import settingsHandler from './handlers/settings';
import profilesHandler from './handlers/profiles';
import { setState } from './state';

export const start = async (port, fixturesDirectory) => {

  setState({ port, fixturesDirectory });

  const server = express();

  // Settings
  server.use(bodyParser.json());

  // Routes
  server.delete('/requests', resetRequestsHandler);
  server.post('/requests', handleRequest);
  server.post('/requests/matched', handleMatchedRequest);
  server.post('/requests/partially-matched', handlePartiallyMatchedRequest);
  server.post('/requests/unmatched', handleUnmatchedRequest);
  server.post('/requests/save', saveRequestsHandler);

  server.get('/settings', settingsHandler);

  server.get('/profiles', profilesHandler);

  // Console
  server.use('/console', express.static('console/build'));

  server.listen(port, () => console.log(chalk.green(`Tundra server started. Console available at http://localhost:${port}/console.`)));
};


