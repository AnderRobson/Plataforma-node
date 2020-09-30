// const multer = require('multer');
// const uploadConfig = require('./uploads');

// const BannerController = require('../controllers/BannerController');
const ProductController = require('../controllers/ProductController');
function createRoutes() {
    async function start(server) {
        const ProductRoutes = await ProductController();
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

module.exports = createRoutes;