import chai from 'chai';
import http from 'http';
import nock from 'nock';

import app from 'server/app';


global.nock = nock;

let server = null;
if (!process.env.ACCEPTANCE_TEST_HOST) server = http.createServer(app);
global.request = chai.request(process.env.ACCEPTANCE_TEST_HOST || server);

after(() => {
  server && server.close();
});
