const express = require('express');
const cors = require('cors');
const contactRouter = require('./route/contactRouter');

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static('./build'));
server.use('/api/v1/contacts', contactRouter);

module.exports = server;
