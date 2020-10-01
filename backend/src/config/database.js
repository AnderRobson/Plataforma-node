const { Sequelize } = require('sequelize');

function createDatabaseConnection() {
    const database = {
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '1234',
        database: process.env.MYSQL_DATABASE || 'loja-dev',
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || '3300',
    };

    async function start() {
        console.log('> [database] Starting...');
        const sequelize = new Sequelize(
            database.database,
            database.user,
            database.password,
            {
                host: database.host,
                port: database.port,
                dialect: 'mysql'
            }
        )

        try {
            await sequelize.authenticate();

            console.log('> [database] Starting done!');

            return {
                Sequelize,
                sequelize
            }
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    function stop() {
        console.log('> [database] Stopping...');
        console.log('> [database] Closing Postgress connection...');
        console.log('> [database] Stopping done!');
    }

    return {
        start,
        stop
    }
}

module.exports = createDatabaseConnection;
