const express = require("express");
// const connection = require('./db-connection');

const app = express();

app.use(express.json());

// Please keep this module.exports app, we need it for the tests !
module.exports = app;