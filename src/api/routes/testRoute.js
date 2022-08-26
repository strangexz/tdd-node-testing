const { Router } = require('express');

const TestController = require('../controllers/testController');

const api = Router()

/* definición de rutas */
api.post('/makeSum', TestController.makeSum);
api.post('/makeProduct', TestController.makeProduct);

module.exports = api;