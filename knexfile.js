const path = require('path');

/* Cargando variables de entorno */
require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './db.test.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/knex/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/knex/seeds')
    },
    useNullAsDefault: true,
  },

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASS,
      port: parseInt(process.env.DEV_DB_PORT),
      charset: 'utf8',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/knex/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '/knex/seeds')
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
