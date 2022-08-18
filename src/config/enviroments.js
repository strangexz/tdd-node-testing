const path = require('path');
/* Implementando dotenv */
const newPath = path.resolve(__dirname, '../../.env');
const envFound = require('dotenv').config({ path: newPath });

if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

/* Cargando variables de entorno */
const env = process.env.NODE_ENV || 'local';

/* Parámetros de logs */
let logLevel;
let logPath;
/* Parámetros Miscelaneos */
let timezone;
let hostname;
let wsUrl;
/* Parámetros de base de datos */
let dbHost;
let dbName;
let dbUser;
let dbPass;
let dbPort;
/* Prámetros de seguridad */
let jwtSeed;

switch (env) {
    case 'development':
        logLevel = process.env.DEV_LOG_LEVEL;
        logPath = process.env.DEV_LOG_PATH;
        timezone = process.env.DEV_TIMEZONE;
        hostname = process.env.DEV_TIMEZONE;
        wsUrl = process.env.DEV_WS_URL;
        dbHost = process.env.DEV_DB_USER;
        dbName = process.env.DEV_DB_PASS;
        dbUser = process.env.DEV_DB_HOST;
        dbPass = process.env.DEV_DB_PORT;
        dbPort = process.env.DEV_DB_NAME;
        jwtSeed = process.env.DEV_JWT_SEED;
        break;
    case 'stagging':
        logLevel = process.env.QA_LOG_LEVEL;
        logPath = process.env.QA_LOG_PATH;
        timezone = process.env.QA_TIMEZONE;
        hostname = process.env.QA_TIMEZONE;
        wsUrl = process.env.QA_WS_URL;
        dbHost = process.env.QA_DB_USER;
        dbName = process.env.QA_DB_PASS;
        dbUser = process.env.QA_DB_HOST;
        dbPass = process.env.QA_DB_PORT;
        dbPort = process.env.QA_DB_NAME;
        jwtSeed = process.env.QA_JWT_SEED;
        break;
    case 'production':
        logLevel = process.env.LOG_LEVEL;
        logPath = process.env.LOG_PATH;
        timezone = process.env.TIMEZONE;
        hostname = process.env.TIMEZONE;
        wsUrl = process.env.WS_URL;
        dbHost = process.env.DB_USER;
        dbName = process.env.DB_PASS;
        dbUser = process.env.DB_HOST;
        dbPass = process.env.DB_PORT;
        dbPort = process.env.DB_NAME;
        jwtSeed = process.env.JWT_SEED;
        break;

    default:
        logLevel = process.env.LOCAL_LOG_LEVEL;
        logPath = process.env.LOCAL_LOG_PATH;
        timezone = process.env.LOCAL_TIMEZONE;
        hostname = process.env.LOCAL_HOSTNAME;
        wsUrl = process.env.LOCAL_WS_URL;
        dbHost = process.env.LOCAL_DB_USER;
        dbName = process.env.LOCAL_DB_PASS;
        dbUser = process.env.LOCAL_DB_HOST;
        dbPass = process.env.LOCAL_DB_PORT;
        dbPort = process.env.LOCAL_DB_NAME;
        jwtSeed = process.env.LOCAL_JWT_SEED;
        break;
}

module.exports = {
    logLevel, logPath, timezone, hostname, dbHost,
    wsUrl, dbName, dbUser, dbPass, dbPort, jwtSeed,
}
