import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import path from 'path';

/** DB */
import db from './config/database';

/** TEST db */
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error DB => ', err));

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use('/api', routes);
server.use(express.static(path.resolve(__dirname + '/public/')));

module.exports = server;
