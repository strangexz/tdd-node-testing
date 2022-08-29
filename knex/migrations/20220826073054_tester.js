const testModel = require('../../src/api/models/TesterModel');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(testModel.tableName, (table) => {
        table.increments('id');
        table.string('name');
        table.string('description');
        table.integer('age');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(testModel.tableName);
};
