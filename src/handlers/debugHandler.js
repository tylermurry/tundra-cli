import { setState } from '../services/state';

export const startDebuggingRequest = (request, response) => {
  setState({ debugProfile: request.params.profileName });
  response.status(200).send();
};

export const stopDebuggingRequest = (request, response) => {
  setState({ debugProfile: null });
  response.status(200).send();
};
