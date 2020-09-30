// const createDatabaseConnection = require('./database');
const createServer = require('./server');
const createRoutes = require('./routes');

function createCore(configurations = {}) {
    const Routes = configurations.routes || createRoutes();
    const Server = configurations.server || createServer();

    async function start() {
        console.log('> [core] Starting...');

        const server = Server.start();

        Routes.start(server).then(() => {
            server.listen(3333, () => {
                console.log('> [core] Starting done! System running!');
            });
        });
    }

    function stop() {
        console.log('> [core] Stopping...');
        Routes.stop();
        Server.stop();
        console.log('> [core] Stopping done!');
    }

    return {
        start,
        stop
    }
}

module.exports = createCore;