const { Router } = require('express');

const TestController = require('../controllers/testController');

const api = Router();

/* definición de rutas */
api.post('/makeSum', TestController.makeSum);

module.exports = api;