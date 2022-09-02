const express = require('express');
const cors = require('cors');
const httpStatusCode = require('http-status-codes');
// const morgan = require('morgan');
const uuidv1 = require('uuid').v1;
const httpContext = require('express-http-context');
const bodyParser = require('body-parser');

const Logger = require('../config/logger');
const routes = require('../api/routes/index');

const log = Logger(__filename);

const app = express();
const router = express.Router();

/* implementando body parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

/* implementacion de http context */
app.use(httpContext.middleware);
/* Corre el contexto por cada solicitud y asigna un identificador único por cada solicitud */
app.use((req, res, next) => {
    httpContext.set('reqId', uuidv1());
    next();
});

/* Configuración del CORS */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Methods', 'GET', 'POST', 'OPTIONS', 'PATCH');
    res.header('Allow', 'GET', 'POST', 'OPTIONS', 'PATCH');

    next();
});
app.use(cors());

/* implementando rutas */
app.use('/tdd', router, routes);

/* Capturando url's inexistentes */
app.use((req, res, next) => {
    log.debug(req.originalUrl);
    log.warn('Solicitud a endpoint incorrecto o inexistente');
    res.status(httpStatusCode.StatusCodes.NOT_FOUND).json({
        message: 'Endpoint incorrecto o inexistente',
        result: []
    });
});

module.exports = app;