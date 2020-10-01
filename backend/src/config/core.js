// const createDatabaseConnection = require('./database');
const createServer = require('./server');
const createRouter = require('./router');

function createCore(configurations = {}) {
    const Routes = configurations.routes || createRouter();
    const Server = configurations.server || createServer();

    function start() {
        console.log('> [core] Starting...');

        const server = Server.start();

        Routes.start(server).then(() => {
            server.listen(3333, () => {
                console.log('> [core] Starting done! System running!');
            });
        }).catch(error => {
            console.log('[core] Error:');
            console.log(error);
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