const Tester = require('../testerModel');

const testers = require('../../../../fixtures/tester');

describe('Tester model unit test', () => {
    describe.each([
        ['first', testers[0]],
        ['second', testers[1]],
        ['third', testers[2]],
        ['fourth', testers[3]],
        ['fifth', testers[4]]])(
            '%s test',
            (input, expected) => {
                let newTester;
                const { name, description } = expected;

                beforeAll(async () => {
                    newTester = await Tester.query().insert({
                        name,
                        description
                    });
                });

                it('should be an instance of TesterModel', () => {
                    expect(newTester instanceof Tester).toBeTruthy();
                });

                it(`should have id`, () => {
                    expect(newTester.id).toBeDefined();
                });

                it(`id should be a number`, () => {
                    expect(newTester.id).toEqual(expect.any(Number));
                });

                it(`should have name`, () => {
                    expect(newTester.name).toBe(name);
                });

                it(`name should be a string`, () => {
                    expect.stringContaining(newTester.name);
                });

                it(`should have description`, () => {
                    expect(newTester.description).toBe(description);
                });

                it(`description should be a string`, () => {
                    expect.stringContaining(newTester.description);
                });
            }
        );
});