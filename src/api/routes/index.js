const express = require('express');

const TestRoutes = require('./testRoute');

const app = express();

app.use('/tests', TestRoutes);

module.exports = app;