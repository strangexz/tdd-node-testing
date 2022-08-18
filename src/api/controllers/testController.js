// import HttpStatus from "http-status-codes";
// import _ from "underscore";
// import validator from "validator";
// import * as url from 'url';

// import Logger from '../../config/logger.js';
// import TestService from "../../services/testService.js";

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const HttpStatus = require('http-status-codes');
const _ = require('underscore');
const validator = require('validator');

const Logger = require('../../config/logger');
const TestService = require('../../services/testService');

const log = Logger(__filename);

/**
 * Controlador de la ruta que realiza la suma de dos enteros
 *
 * @alias makeSum
 * @param {Request} req - objeto de solicitud (http request)
 * @param {Response} res - objeto de respuesta (http response)
 * @returns {json} un objeto json con 3 atributos:
 *  message: un mensaje descriptivo de la respuesta
 *  result: un objeto con el resultado de la transacción.
 */
const makeSum = async (req, res) => {

    let msg;

    /* Validando el campo  numberOne */
    if (!_.isNumber(req.body.numberOne) && !_.isString(req.body.numberOne)) {
        msg = 'el campo "numberOne" debe ser numérico';

        log.warn(msg);

        return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .send({
                message: msg,
                result: req.body
            });
    }

    if (_.isString(req.body.numberOne) && !validator.isNumeric(req.body.numberOne)) {
        msg = 'el campo "numberOne" debe ser numérico';

        log.warn(msg);

        return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .send({
                message: msg,
                result: req.body
            });
    }

    /* Validando el campo  numberTwo */
    if (!_.isNumber(req.body.numberTwo) && !_.isString(req.body.numberTwo)) {
        msg = 'el campo "numberTwo" debe ser numérico';

        log.warn(msg);

        return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .send({
                message: msg,
                result: req.body
            });
    }

    if (_.isString(req.body.numberTwo) && !validator.isNumeric(req.body.numberTwo)) {
        msg = 'el campo "numberTwo" debe ser numérico';

        log.warn(msg);

        return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .send({
                message: msg,
                result: req.body
            });
    }

    const numberOne = (_.isNumber(req.body.numberOne)) ? req.body.numberOne : parseFloat(req.body.numberOne);
    const numberTwo = (_.isNumber(req.body.numberTwo)) ? req.body.numberTwo : parseFloat(req.body.numberTwo);

    const testService = new TestService();
    const { status, message, result } = await testService.makeSum(numberOne, numberTwo);

    log.verbose('Devolviendo la respuesta obtenida...');

    if (status === 1) {
        return res
            .status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                message,
                result
            });
    }

    return res
        .status(HttpStatus.StatusCodes.OK)
        .send({
            message,
            result
        });
}

module.exports = {
    makeSum
}

