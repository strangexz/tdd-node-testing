const _ = require('underscore');
const Logger = require('../config/logger');
const axios = require('axios');

const log = Logger(__filename);

/** Clase con los servicios de prueba */
class TestServices {
    /**
     * Método que realiza la suma de dos enteros
     *
     * Este método se encarga de sumar dos enteros
     *
     * @alias makeSum
     * @param {number} numberOne - primer numero a sumar
     * @param {number} numberTwo - segundo numero a sumar
     * @returns {json} un objeto json con 3 atributos:
     *  status: numero entero con un código de estado
     *  message: un mensaje descriptivo de la respuesta
     *  result: total de la suma.
     */
    async makeSum(numberOne, numberTwo) {
        try {
            log.info('Inicio del servicio TestServices.makeSum');

            const total = numberOne + numberTwo;

            log.verbose('Devolviendo el total de la suma...');
            log.info('Fin del servicio TestServices.makeSum');

            if (_.isNaN(total)) {
                return { status: 1, message: 'No se sumó, se concatenó', result: total };
            }

            if (_.isString(total)) {
                return { status: 1, message: 'No se sumó, se concatenó', result: total };
            }

            return { status: 0, message: 'Suma exitosa', result: total };

        } catch (error) {
            // handle error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('data', error.response.data);
                console.error('status', error.response.status);
                console.error('headers', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error('request', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            console.log(log);
            log.error(error.message);
            console.error('config', error.config);

            return { status: 1, message: error.message, result: null };
        }

    };

    /**
     * Método que realiza la multiplicación de dos enteros
     *
     * Este método se encarga de multiplicar dos enteros
     *
     * @alias makeProduct
     * @param {number} numberOne - primer numero a multiplicar
     * @param {number} numberTwo - segundo numero a multiplicar
     * @returns {json} un objeto json con 3 atributos:
     *  status: numero entero con un código de estado
     *  message: un mensaje descriptivo de la respuesta
     *  result: total de la suma.
     */
    async makeProduct(numberOne, numberTwo) {
        try {
            log.info('Inicio del servicio TestServices.makeProduct');

            const product = numberOne * numberTwo;

            log.verbose('Devolviendo el producto de la multiplicacion...');

            if (_.isNaN(product)) {
                return { status: 1, message: 'Devuelve un NaN', result: product };
            }

            log.info('Fin del servicio TestServices.makeProduct')

            return { status: 0, message: 'Multiplicacion exitosa', result: product };

        } catch (error) {
            // handle error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('data', error.response.data);
                console.error('status', error.response.status);
                console.error('headers', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error('request', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            console.log(log);
            log.error(error.message);
            console.error('config', error.config);

            return { status: 1, message: error.message, result: null };
        }

    };

    /**
     * Método que realiza el consumo de un API externo
     *
     * Este método se encarga de consumir otra API externa y devolver la respuesta
     *
     * @alias getDogs
     * @param {number} count - numero de imagenes solicitadas
     * @returns {json} un objeto json con 3 atributos:
     *  status: numero entero con un código de estado
     *  message: un mensaje descriptivo de la respuesta
     *  result: total de la suma.
     */
    async getDogs(count) {
        try {
            log.info('Inicio del servicio TestServices.getDogs');
            const urlApi = 'https://dog.ceo/api/breeds/image/random/';

            /** Consultando el servicio de GeoJS */
            const response = await axios.get(urlApi + count);

            log.debug('response', response);
            log.debug('response.data', response.data);
            log.debug('response.config', response.config);
            log.info('Devolviendo los datos obtenidos de GeoJs... ');

            log.info('Fin del servicio TestServices.getDogs')

            return { status: 0, message: 'consulta exitosa', result: response.data };

        } catch (error) {
            console.error(error);
            // handle error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('data', error.response.data);
                console.error('status', error.response.status);
                console.error('headers', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error('request', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
            log.error(error.message);
            console.error('config', error.config);

            return { status: 1, message: error.message, result: null };
        }

    };
}

module.exports = TestServices;