// Default State
let state = {
  port: 9091,
  fixturesDirectory: 'fixtures',
  requests: []
};

export const setState = (newState) => {
  state = { ...state, ...newState }
};

export const getState = () => state;
