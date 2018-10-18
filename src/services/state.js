// Default State
let state = {
  port: 9091,
  socketPort: null,
  fixturesDirectory: 'fixtures',
  requests: [],
  debugProfile: null,
};

export const setState = (newState) => {
  state = { ...state, ...newState }
};

export const getState = () => state;
