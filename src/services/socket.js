import WebSocket from 'ws';
import getPort from 'get-port';

let socket = null;

export const sendSocketMessage = message => {
  if (socket) {
    socket.send(message);
  } else {
    console.error('Could not send message. Socket connection not established.');
  }
};

export const init = async () => {
  const port = await getPort();
  const wss = new WebSocket.Server({ port });

  wss.on('connection', ws => {
    socket = ws;
    console.log('Socket connection established with client');
  });

  return port;
};
