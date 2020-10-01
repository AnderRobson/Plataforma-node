// const multer = require('multer');
// const uploadConfig = require('./uploads');

// const BannerController = require('../controllers/BannerController');
const createProductRoutes = require('../routes/product');
function createRouter() {
    async function start(server) {
        const ProductRoutes = await createProductRoutes();
        const productRoutes = await ProductRoutes.start();
        server.use('/product', productRoutes)

        return server;
    }

    function stop() {

    }

    return {
        start,
        stop
    }
}

module.exports = createRouter;