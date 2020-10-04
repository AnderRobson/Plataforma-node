const createDatabaseConnection = require('../config/database');

function createBannerModel (configurations = {}) {
    const DatabaseConnection = createDatabaseConnection();

    async function start() {
        console.log('> [banner_model] Starting...');
        const Database = await DatabaseConnection.start();

        const Banner = await Database.sequelize.define('banners', {
            title: {
                type: Database.Sequelize.STRING
            },
            slug: {
                type: Database.Sequelize.STRING
            },
            description: {
                type: Database.Sequelize.STRING
            },
            image: {
                type: Database.Sequelize.STRING
            },
            image_url: {
                type: Database.Sequelize.VIRTUAL,
                get() {
                    return `http://localhost:3333/files/banner/${this.image}`;
                }
            },
            type: {
                type: Database.Sequelize.INTEGER
            },
            status: {
                type: Database.Sequelize.TINYINT
            }
        });

        return Banner;
    }

    function stop() {

    }

    return {
        start,
        stop
    }
}

module.exports = createBannerModel;
