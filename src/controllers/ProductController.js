const express = require('express');
const createProductModel = require('../models/ProductModel');

async function createProductController (configurations = {}) {
    const routes = express.Router();
    const ProductModel = createProductModel();
    const Product = await ProductModel.start()


    routes.get('/', (req, res)  => {
        Product.findAll().then(resultado => {
            res.send({
                products: resultado.map(produto => {
                    return {
                        id: produto.id,
                        status : produto.status,
                        title : produto.title,
                        description: produto.description,
                        code: produto.code
                    }
                })
            });
        }).catch(error => {
            console.log(error)
        });
    });

    routes.get('/:id_product', (req, res)  => {
        const id = req.params.id_product;

        Product.findByPk(id).then(produto => {
            let product = {};

            if (produto !== null) {
                product = {
                    id: produto.id,
                    status : produto.status,
                    title : produto.title,
                    description: produto.description,
                    code: produto.code
                }
            }
            return res.send({
                product: product
            });
        }).catch(error => {
            console.log(error)
        });
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

module.exports = createProductController;