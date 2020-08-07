const express = require('express');
const cors = require('cors');
const contactRouter = require('./route/contactRouter');
const validationMiddleware = require('./middleware/validation');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static('./build'));
server.use('/api/v1/contacts', validationMiddleware, contactRouter);

module.exports = server;
