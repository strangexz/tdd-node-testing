const moment = require('moment-timezone');
const { existsSync, mkdirSync } = require('fs');
const { sep, join } = require('path');
const { createLogger, format, transports } = require('winston');
const { get } = require('express-http-context');

/* Cargando variables de entorno */
const config = require('./enviroments');

/* Determinando el entorno */
const enviroment = process.env.NODE_ENV || 'local';

/* { error: 5, warn: 4, info: 3, verbose: 2, debug: 1, silly: 0 } */
const level = config.logLevel;
const timezoneConfigured = moment().tz(config.timezone);
const myTimestamp = timezoneConfigured.format().slice(0, 19).replace("T", " ");

const getLabel = function (modulePath) {
    const parts = modulePath.split(sep);
    return join(parts[parts.length - 2], parts.pop());
};

/* Mostrando el nivel del log */
console.info(`${myTimestamp} - Configurando Logger global [${level}] [Winston]`);
console.info(`${myTimestamp} - Logger global configurado`);

/* Exportando Logger como función */
module.exports = function (callingModule) {

    /* Crea el directorio de logs si no existiera */
    if (!existsSync(config.logPath)) {
        mkdirSync(config.logPath);
    }

    const filenameE = join(config.logPath, 'error.log');
    const filename = join(config.logPath, 'app.log');

    /* Definiendo el formato del log */
    const formatParams = (info) => {
        const { timestamp, level, message, ...args } = info;
        const label = getLabel(callingModule)

        const reqId = get('reqId');
        const msg = `${myTimestamp} ${level} [${label}]: ${message} ${Object.keys(args).length
            ? JSON.stringify(args, "", "")
            : ""}`;

        const msgUID = `${myTimestamp} ${level} [${label}]-[${reqId}]: ${message} ${Object.keys(args).length
            ? JSON.stringify(args, "", "")
            : ""}`;

        return (reqId) ? msgUID : msg;
        // return msg;
    }

    /* Asignando configuraciones de formato de acuerdo al ambiente */
    const localFormat = format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf(formatParams)
    );

    const developmentFormat = format.combine(
        format.timestamp(),
        format.align(),
        format.printf(formatParams)
    );

    const staggingFormat = format.combine(
        format.timestamp(),
        format.align(),
        format.printf(formatParams)
    );

    const productionFormat = format.combine(
        format.timestamp(),
        format.align(),
        format.printf(formatParams)
    );

    let logger;

    switch (enviroment) {
        case 'test':
            logger = createLogger({
                silent: true
            });
            break;
        case 'local':
            logger = createLogger({
                level,
                format: localFormat,
                transports: [
                    new transports.Console()
                ]
            });
            break;
        case 'development':
            logger = createLogger({
                level,
                format: developmentFormat,
                transports: [
                    new transports.Console(),
                    new transports.File({ filename: filenameE, level: "error" }),
                    new transports.File({ filename })
                ]
            });
            break;
        case 'stagging':
            logger = createLogger({
                level,
                format: staggingFormat,
                transports: [
                    new transports.Console(),
                    new transports.File({ filename: filenameE, level: "error" }),
                    new transports.File({ filename })
                ]
            });
            break;
        case 'production':
            logger = createLogger({
                level,
                format: productionFormat,
                transports: [
                    new transports.Console(),
                    new transports.File({ filename: filenameE, level: "error" }),
                    new transports.File({ filename })
                ]
            });
            break;
        default:
            break;
    }

    // logger.error('Error Logger configured');
    // logger.warn('Warn Logger configured');
    // logger.info('Info Logger configured');
    // logger.debug('Debug Logger configured');
    // logger.verbose('Verbose Logger configured');
    // logger.silly('Silly Logger configured');

    return logger
};
