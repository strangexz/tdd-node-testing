const { Model } = require('objection');
const path = require('path');
const Knex = require('knex');

/* Cargando variables de entorno */
require('dotenv').config();

/* Cargando variables de entorno */
const nodeEnv = process.env.NODE_ENV

let knexConfig;

knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './db.test.sqlite3'
    },
    useNullAsDefault: true
};

if (nodeEnv !== 'test') {
    knexConfig = {
        client: 'mysql',
        connection: {
            host: process.env.DEV_DB_HOST,
            database: process.env.DEV_DB_NAME,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASS,
            port: parseInt(process.env.DEV_DB_PORT),
            charset: 'utf8',
        }
    }
}

// Initialize knex.
const knex = Knex(knexConfig);

Model.knex(knex);

class Base extends Model {
    static get modelPaths() {
        return [path.resolve('src/api/models')];
    }
}

module.exports = Base;