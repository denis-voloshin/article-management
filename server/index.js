import http from 'http';

import { bootstrap } from './bootstrap';

const port = process.env.PORT || 5000;

const server = http.createServer(bootstrap());

server.listen(port);

export default server;
