const createDatabaseConnection = require('../config/database');

function createProductModel (configurations = {}) {
    const DatabaseConnection = createDatabaseConnection();

    async function start() {
        console.log('> [product_model] Starting...');
        const Database = await DatabaseConnection.start();

        const Product = await Database.sequelize.define('products', {
            title: {
                type: Database.Sequelize.STRING
            },
            slug: {
                type: Database.Sequelize.STRING
            },
            code: {
                type: Database.Sequelize.STRING
            },
            description: {
                type: Database.Sequelize.TEXT
            },
            status: {
                type: Database.Sequelize.TINYINT
            }
        });

        return Product;
    }

    function stop() {

    }

    return {
        start,
        stop
    }
}

module.exports = createProductModel;
