import http from 'http';
import 'dotenv/config';

import app from './app';

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port);
