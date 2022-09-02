const TestService = require('../testService');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

let mockAdapter;
let baseUrlApi;

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

    describe('pruebas al método makeProduct', () => {
        test('deberia de multiplicar los dos numeros y devolver 6', async () => {
            const testService = new TestService();
            const numberOne = 3;
            const numberTwo = 2;

            const { status, message, result } = await testService.makeProduct(numberOne, numberTwo);

            expect(status).toStrictEqual(expect.any(Number));
            expect(status).toEqual(0);
            expect.stringContaining(message);
            expect(result).toStrictEqual(expect.any(Number));
            expect(result).toBe(6);
        });

        it('deberia de fallar porque me devuelve un NaN', async () => {
            const testService = new TestService();
            const numberOne = 3;
            const numberTwo = 'dos';

            const { status, message, result } = await testService.makeProduct(numberOne, numberTwo);

            expect(status).toStrictEqual(expect.any(Number));
            expect(status).toEqual(1);
            expect.stringContaining(message);
            expect(result).toBeNaN();
        });

    });

    describe('pruebas al método de consultas de apis externas', () => {
        beforeAll(() => {
            mockAdapter = new MockAdapter(axios);
            baseUrlApi = 'https://dog.ceo/api/breeds/image/random';
        });

        afterEach(() => {
            mockAdapter.reset();
        });

        it('deberia de ser una consulta exitosa', async () => {
            const responseHeader = {
                'date': new Date().toGMTString(),
                'content-type': "application/json",
                'x-powered-by': "PHP/7.3.31",
                'cache-control': "no-cache, private",
                'access-control-allow-origin': "*",
                'via': "1.1 varnish (Varnish/6.3), 1.1 varnish (Varnish/6.3)",
                'x-cache-hits': 0,
                'x-cache': "MISS",
                'age': 0,
                'vary': "Accept-Encoding",
                'cf-cache-status': "DYNAMIC",
                'report-to': {
                    "endpoints": [
                        {
                            "url": "https:/a.nel.cloudflare.com/report/v3?s=fsaOhHpHKYi99SPMpZnFMB8rkPM1prqOB9t0V1o0U7e98NY%2FPURyDGBanBpCfDDNrwIWFdw8ojWcLM16JfdQU8r2cywDNX4ovjO1nxEsRBJsBvd7scR63Kdd"
                        }
                    ],
                    "group": "cf-nel",
                    "max_age": 604800
                },
                'nel': {
                    "success_fraction": 0,
                    "report_to": "cf-nel",
                    "max_age": 604800
                },
                'server': "cloudflare",
                'cf-ray': "74422bdbda19b3da-MIA",
                'alt-svc': "h3=':443'; ma=86400, h3-29=':443'; ma=86400"
            };

            const count = 3;

            // const response = {
            //     status: jest.fn().mockReturnThis(),
            //     result: jest.fn()
            // };

            const mockAxiosResponse = {
                message: [
                    "https://images.dog.ceo/breeds/spaniel-brittany/n02101388_3762.jpg",
                    "https://images.dog.ceo/breeds/weimaraner/n02092339_7596.jpg",
                    "https://images.dog.ceo/breeds/setter-english/n02100735_4051.jpg"
                ],
                status: "success"
            };

            const urlApi = `${baseUrlApi}/${count}`;

            mockAdapter.onGet(urlApi)
                .reply(200, mockAxiosResponse, responseHeader);

            const service = new TestService();
            const response = await service.getDogs(count);

            expect(mockAdapter.history.get.length).toBe(1);
            expect(mockAdapter.history.get[0].url).toEqual(urlApi);
            expect(response).toHaveProperty('status');
            expect(response.status).toBe(0);
            expect(response).toHaveProperty('message');
            expect.stringContaining(response.message)
            expect(response).toHaveProperty('result');
            expect(response.result).toStrictEqual(mockAxiosResponse);
        });

        it('deberia de devolver un error', async () => {
            const count = 2;
            const urlApi = `${baseUrlApi}/${count}`;

            mockAdapter.onGet(urlApi).networkErrorOnce();

            const service = new TestService();
            const response = await service.getDogs(count);

            expect(mockAdapter.history.get.length).toBe(1);
            expect(mockAdapter.history.get[0].url).toEqual(urlApi);
            expect(response).toHaveProperty('status');
            expect(response.status).toBe(1);
            expect(response).toHaveProperty('message');
            expect.stringContaining(response.message)
            expect(response).toHaveProperty('result');
            expect(response.result).toBeNull();
        });
    });
});
