import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import {
  handleRequest,
  resetRequestsHandler,
  saveRequestsHandler
} from './handlers/requests';
import { startDebuggingRequest, stopDebuggingRequest } from './handlers/debugHandler';
import settingsHandler from './handlers/settings';
import profilesHandler from './handlers/profiles';
import { setState } from './services/state';
import * as Socket from './services/socket';
import opn from 'opn';
import cors from 'cors';

export const start = async (port, fixturesDirectory) => {

  const server = express();

  // Middleware
  server.use(cors());
  server.use(bodyParser.json());

  // Console
  server.use(express.static('console/build'));

  // Routes
  server.delete('/requests', resetRequestsHandler);
  server.post('/requests', handleRequest);
  server.post('/requests/:type', handleRequest);
  server.post('/requests/save', saveRequestsHandler);

  server.get('/settings', settingsHandler);

  server.post('/debug/profile/:profileName', startDebuggingRequest);
  server.delete('/debug', stopDebuggingRequest);

  server.get('/profiles', profilesHandler);

  server.listen(port, () => console.log(chalk.green(`Tundra server started. Console available at http://localhost:${port}.`)));

  // Websocket Server
  const socketPort = await Socket.init();

  console.log(`Socket started on port ${socketPort}. Waiting for client to join...`);

  setState({ port, socketPort, fixturesDirectory });

  // Launch Console
  console.log(`Launching console...`);
  opn(`http://localhost:${port}`);
};


