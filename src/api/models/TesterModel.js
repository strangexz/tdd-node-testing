const Base = require('./Base');

// const { Knex } = require('../../../knex/knex');

// Model.knex(Knex);

class TestModel extends Base {

    static get tableName() {
        return 'tester_table';
    }

    static get idColumn() {
        return 'id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string', minLength: 1, maxLength: 255 },
            }
        }
    }
}

module.exports = TestModel;


