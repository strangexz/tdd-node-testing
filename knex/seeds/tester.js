const testModel = require('../../src/api/models/TesterModel');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(testModel.tableName).del()
  await knex(testModel.tableName).insert([
    { id: 1, name: 'rowValue1', description: 'rowDescription1' },
    { id: 2, name: 'rowValue2', description: 'rowDescription2' },
    { id: 3, name: 'rowValue3', description: 'rowDescription3' }
  ]);
};
