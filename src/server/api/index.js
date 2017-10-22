import Express from 'express';
import bodyParser from 'body-parser';

import govhackApiServer from 'server/api/govhack';
import contactHandler from 'server/api/handlers/contact';


const apiServer = new Express();

apiServer.get('/healthcheck', (req, res) => {
  res.send({ status: 'ok' });
});

apiServer.use('/govhack', govhackApiServer);

apiServer.post('/contact', bodyParser.json(), contactHandler);

apiServer.use((req, res, next) => {
  const error = new Error(`Resource for '${req.url}' not found`);
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
apiServer.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status);
  res.send({
    status,
    message: err.message || 'An unknown error occurred',
  });
});

export default apiServer;
