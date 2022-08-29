const Base = require('./Base');
class TestModel extends Base {

    static get tableName() {
        return 'tester_table';
    }

    // static get idColumn() {
    //     return 'id';
    // }

    // static get jsonSchema() {
    //     return {
    //         type: 'object',
    //         required: ['name'],
    //         properties: {
    //             id: { type: 'integer' },
    //             name: { type: 'string', minLength: 1, maxLength: 255 },
    //             description: { type: 'string', minLength: 1, maxLength: 255 },
    //         }
    //     }
    // }
}

module.exports = TestModel;


