
import http from 'http';

import config from 'app/config';
import app from './app';


let server;
if (process.env.HTTPS_ORIGIN) {
  // For our local prod emulation mode, we use httpolyglot to run HTTP/HTTPS on the same port

  // eslint-disable-next-line global-require, import/no-unresolved
  const cert = require('./server.pem');
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  server = require('httpolyglot').createServer({
    key: cert,
    cert,
  }, app);
} else {
  server = http.createServer(app);
}

let { port } = config;
if (__DEVELOPMENT__) port = parseInt(config.port, 10) + 1;

server.listen(port);
