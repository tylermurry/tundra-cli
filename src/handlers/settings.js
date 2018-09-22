import { getState } from "../services/state";

export default (request, response) => {

  const { port, socketPort, fixturesDirectory } = getState();

  response.status(200).send({ port, socketPort, fixturesDirectory });
}
