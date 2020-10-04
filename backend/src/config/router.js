const createBannerRoutes = require('../routes/banner');
const createProductRoutes = require('../routes/product');

function createRouter() {
    const ProductRoutes = createProductRoutes();
    const BannerRoutes = createBannerRoutes();

    async function start(server) {
        const productRoutes = await ProductRoutes.start();
        const bannerRoutes = await BannerRoutes.start();

        server.use('/product', productRoutes);
        server.use('/banner', bannerRoutes);

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
