import { getState } from "../state";

export default (request, response) => {
  response.status(200).send({
    port: getState().port,
    fixturesDirectory: getState().fixturesDirectory
  });
}
