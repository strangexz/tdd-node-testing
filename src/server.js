const Logger = require('./config/logger');
const server = require('./api/index');

const log = Logger(__filename);

server.listen(3000, () => {
    log.info('Servidor corriendo en el puerto 3000');
});

