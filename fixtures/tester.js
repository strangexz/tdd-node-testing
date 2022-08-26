const { faker } = require('@faker-js/faker');
const _ = require('underscore');

const testers = [];
for (let index = 0; index < 5; index++) {
    let name;
    let description;

    do {
        name = faker.company.bsBuzz().trim();
        description = faker.company.bs().trim();
    } while (_.contains(name));

    testers.push({ name, description });
}

module.exports = testers;