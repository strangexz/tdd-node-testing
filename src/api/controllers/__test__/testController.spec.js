const request = require('supertest');

const app = require('../../index');

describe('Pruebas de integración a los endpoints del controlador testController', () => {
    describe('POST /tests', () => {
        describe('/makeSum', () => {
            describe('solicitudes exitosas', () => {
                it('deberia de sumar exitosamente', async () => {
                    const bodyParams = {
                        numberOne: 1,
                        numberTwo: 2
                    };

                    const res = await request(app)
                        .post('/tdd/tests/makeSum')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toBe(3);
                });

                it('esta tambien deberia de sumar exitosamente', async () => {
                    const bodyParams = {
                        numberOne: 2342,
                        numberTwo: 23242
                    };

                    const res = await request(app)
                        .post('/tdd/tests/makeSum')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toBe(200);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toStrictEqual(expect.any(Number));
                });
            });

            describe('excepciones', () => {
                it('deberia fallar porque no se envió el parámetro "numberOne"', async () => {
                    const bodyParams = {
                        numberTwo: 2
                    };

                    const res = await request(app)
                        .post('/tdd/tests/makeSum')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toBe(400);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toStrictEqual(bodyParams);
                });

                it('deberia fallar porque el parámetro "numberOne" no es numérico', async () => {
                    const bodyParams = {
                        numberOne: 'uno',
                        numberTwo: 2
                    };

                    const res = await request(app)
                        .post('/tdd/tests/makeSum')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toBe(400);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toStrictEqual(bodyParams);
                });

                it('deberia fallar porque el parámetro "numberOne" tampoco no es numérico', async () => {
                    const bodyParams = {
                        numberOne: false,
                        numberTwo: 2
                    };

                    const res = await request(app)
                        .post('/tdd/tests/makeSum')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toBe(400);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toStrictEqual(bodyParams);
                });

                it('deberia fallar porque no se envió el parámetro "numberTwo"', async () => {
                    const bodyParams = {
                        numberOne: 2
                    };

                    const res = await request(app)
                        .post('/tdd/tests/makeSum')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toBe(400);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toStrictEqual(bodyParams);
                });

                it('deberia fallar porque el parámetro "numberTwo" no es numérico', async () => {
                    const bodyParams = {
                        numberOne: 45,
                        numberTwo: 'dos'
                    };

                    const res = await request(app)
                        .post('/tdd/tests/makeSum')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toBe(400);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toStrictEqual(bodyParams);
                });

                it('deberia fallar porque el parámetro "numberTwo" tampoco no es numérico', async () => {
                    const bodyParams = {
                        numberOne: 256,
                        numberTwo: true
                    };

                    const res = await request(app)
                        .post('/tdd/tests/makeSum')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toBe(400);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toStrictEqual(bodyParams);
                });
            });
        });

        describe('/makeProduct', () => {
            describe('solicitud exitosa', () => {
                it('debería de devolver el producto de 2 numeros, en este caso 12', async () => {
                    const bodyParams = {
                        numberOne: 4,
                        numberTwo: 3
                    }

                    const res = await request(app)
                        .post('/tdd/tests/makeProduct')
                        .send(bodyParams)
                        .set('Accept', 'application/json');

                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty('message');
                    expect.stringContaining(res.body.message);
                    expect(res.body).toHaveProperty('result');
                    expect(res.body.result).toStrictEqual(expect.any(Number));
                    expect(res.body.result).toEqual(12);
                });

            });

        });

    });

});