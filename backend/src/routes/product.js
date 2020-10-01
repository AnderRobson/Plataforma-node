const express = require('express');
const ProductController = require('../controllers/ProductController');

async function createProductRoutes (configurations = {}) {
    const routes = express.Router();
    const ProductRoutes = await ProductController();

    routes.get('/', (req, res) => {
        return ProductRoutes.index(req, res);
    });

    routes.get('/:id_product', (req, res)  => {
        return ProductRoutes.show(req, res);
    });

    routes.post('/', (req, res) => {
        return ProductRoutes.store(req, res);
    });

    routes.patch('/:id_product', (req, res) => {
        return ProductRoutes.update(req, res);
    });

    routes.delete('/:id_product', (req, res) => {
        return ProductRoutes.destroy(req, res);
    });

    function start() {
        return routes;
    }

    function stop() {

    }

    return {
        start,
        stop
    }
}

module.exports = createProductRoutes;