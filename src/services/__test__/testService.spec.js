const TestService = require('../testService');

describe('Pruebas al servicio Test', () => {
    describe('pruebas a la funcion makeSum', () => {
        it('deberia de devolver 3', async () => {
            const testService = new TestService();
            const numberOne = 1;
            const numberTwo = 2;

            const { status, message, result } = await testService.makeSum(numberOne, numberTwo);
            expect(status).toEqual(0);
            expect.stringContaining(message);
            expect(result).toEqual(3);

        });

        it('deberia ser un numero ', async () => {
            const testService = new TestService();
            const numberOne = 1;
            const numberTwo = 2;

            const { status, message, result } = await testService.makeSum(numberOne, numberTwo);

            expect(status).toStrictEqual(expect.any(Number));
            expect.stringContaining(message);
            expect(result).toStrictEqual(expect.any(Number));
        });

        it('deberia de fallar por que concatenó', async () => {
            const testService = new TestService();
            const numberOne = 'uno';
            const numberTwo = 2;

            const { status, message, result } = await testService.makeSum(numberOne, numberTwo);
            expect(status).toEqual(1);
            expect.stringContaining(message);
            expect.stringContaining(result);
            // expect(result).toBeNull();
        });

        it('deberia de fallar', async () => {
            const testService = new TestService();
            const numberOne = undefined;
            const numberTwo = 2;

            const { status, message, result } = await testService.makeSum(numberOne, numberTwo);
            expect(status).toEqual(1);
            expect.stringContaining(message);
            expect(result).toBeNaN();
        });
    });
});