const createProductModel = require('../models/ProductModel');

async function createProductController (configurations = {}) {
    const ProductModel = createProductModel();
    const Product = await ProductModel.start()

    function index(req, res) {
        Product.findAll().then(response => {
            return res.send({
                status: 1,
                mensagem: 'Buscar todos os produtos',
                products: response.map(product => {
                    return {
                        id: product.id,
                        status : product.status,
                        title : product.title,
                        description: product.description,
                        code: product.code,
                        request: {
                            type: 'GET',
                            description: 'Buscar produto',
                            url: 'http://localhost:3333/product/' + product.id
                        }
                    }
                })
            });
        }).catch(error => {
            console.log(error);
        });
    }

    function show(req, res) {
        const { id_product } = req.params;

        Product.findByPk(id_product).then(produto => {
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
                status: 1,
                mensagem: 'Buscar um produto',
                product: product
            });
        }).catch(error => {
            console.log(error)
        });
    }

    function store(req, res) {
        let { status, title, description, code } = req.body;

        Product.create({
            status,
            title,
            description,
            code
        }).then(response => {
            return res.status(201).send({
                status: 1,
                mensagem: 'Produto cadastrado com sucesso',
                product: {
                    id: response.id,
                    status : response.status,
                    title : response.title,
                    description: response.description,
                    code: response.code,
                    request: {
                        type: 'GET',
                        description: 'Buscar produto',
                        url: 'http://localhost:3333/product/' + response.id
                    }
                }
            });
        }).catch(error => {
            return res.status(500).send({
                error: error
            });
        });
    }

    function update(req, res) {
        const { id_product } = req.params;
        let { status, title, description, code } = req.body
        let update = {};

        if (status === 1 || status === 0) {
            update.status = status;
        }

        if (title) {
            update.title = title;
        }

        if (description) {
            update.description = description;
        }

        if (code) {
            update.code = code;
        }

        Product.update(update, {
            where: {
                id: id_product
            }
        }).then(response => {
            let communication = {
                status: response[0],
                code: 202,
                message: 'Produto alterado com sucesso'
            }
            if (! communication.status) {
                communication.code = 500;
                communication.message = 'Erro ao alterar o produto'
            }

            res.status(communication.code).send({
                status: communication.status,
                message: communication.message
            });
        }).catch(error => {
            return res.status(500).send({
                error: error
            });
        });
    }

    function destroy(req, res) {
        const { id_product } = req.params;

        Product.destroy({
            where: {
                id: id_product
            }
        }).then(response => {
            let communication = {
                status: response,
                code: 202,
                message: 'Produto deletado com sucesso'
            }
            if (! communication.status) {
                communication.code = 500;
                communication.message = 'Erro ao deletado o produto'
            }

            res.status(communication.code).send({
                status: communication.status,
                mensagem: communication.message
            });
        }).catch(error => {
            res.status(500).send({
                error: error
            });
        });
    }

    return {
        index,
        show,
        store,
        update,
        destroy
    }
}

module.exports = createProductController;
