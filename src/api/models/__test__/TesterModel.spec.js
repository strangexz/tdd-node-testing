const Tester = require('../testerModel');

// const testers = require('../../../../fixtures/tester');

const testers = [
    { id: 1, name: 'andres', description: 'desc andres', age: 28 },
    { id: 2, name: 'Criss', description: 'desc Criss', age: 29 },
    { id: 3, name: 'Nem', description: 'desc Nem', age: 24 },
    { id: 4, name: 'Marvin', description: 'desc Marvin', age: 22 },
    { id: 5, name: 'Charlies', description: 'desc Charlies', age: 28 }
]

describe('Pruebas al modelo de base de datos Tester', () => {
    describe.each([
        ['first', testers[0]],
        ['second', testers[1]],
        ['third', testers[2]],
        ['fourth', testers[3]],
        ['fifth', testers[4]]
    ])(
        '%s test',
        (input, expected) => {
            let newTester;
            const { name, description, age } = expected;

            beforeAll(async () => {
                newTester = await Tester.query().insert({
                    name,
                    description,
                    age
                });
            });

            it('deberia de ser una instancia de Tester', () => {
                expect(newTester instanceof Tester).toBeTruthy();
            });

            it(`deberia de tener un atributo id`, () => {
                expect(newTester.id).toBeDefined();
            });

            it(`id deberia de ser un numero`, () => {
                expect(newTester.id).toEqual(expect.any(Number));
            });

            it(`deberia de tener un atributo name`, () => {
                expect(newTester.name).toBeDefined();
                expect(newTester.name).toBe(name);
            });

            it(`name deberia de ser un string`, () => {
                expect.stringContaining(newTester.name);
            });

            it(`deberia de tener el atributo description`, () => {
                expect(newTester.description).toBeDefined();
                expect(newTester.description).toBe(description);
            });

            it(`description debería ser un string`, () => {
                expect.stringContaining(newTester.description);
            });

            it('deberia de tener un atributo age', () => {
                expect(newTester.age).toBeDefined();
                expect(newTester.age).toBe(age);
            });

            it('age deberia ser un número', () => {
                expect(newTester.age).toEqual(expect.any(Number));
            });
        }
    );
});