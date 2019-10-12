import { createServer } from 'http';
import next from 'next';

import 'dotenv/config';

import routes from './routes';

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const requestHandler = routes.getRequestHandler(app);

app.prepare()
  .then(() => {
    createServer(requestHandler).listen(process.env.PORT || 3000);
  });
