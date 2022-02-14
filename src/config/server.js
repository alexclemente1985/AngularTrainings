const express = require('express');
const app = express();
const router = require('../router/routes');

app.use(router);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const http = require('http');

const server = http.createServer(app);

module.exports = server;