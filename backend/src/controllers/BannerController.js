const createBannerModel = require('../models/BannerModel');

async function createBannerController (configurations = {}) {
    const BannerModel = createBannerModel();
    const Banner = await BannerModel.start();

    function index(req, res) {
        Banner.findAll().then(response => {
            return res.send({
                status: 1,
                message: 'Buscar todos os banners',
                banners: response.map(banner => {
                   return {
                       id: banner.id,
                       title: banner.title,
                       slug: banner.slug,
                       description: banner.description,
                       image: banner.image,
                       image_url: banner.image_url,
                       type: banner.type,
                       status: banner.status,
                       request: {
                           type: 'GET',
                           description: 'Buscar banner',
                           url: 'http://localhost:3333/banner/' + banner.id
                       }
                   }
                })
            })
        }).catch(error => {
            console.log(error);
        })
    }

    function show(req, res) {
        const { id_banner } = req.params;

        Banner.findByPk(id_banner).then(response => {
            let banner = {};

            if (response !== null) {
                banner = {
                    id: response.id,
                    title: response.title,
                    slug: response.slug,
                    description: response.description,
                    image: response.image,
                    image_url: response.image_url,
                    type: response.type,
                    status: response.status
                }
            }
            return res.send({
                status: 1,
                message: 'Buscar um banner',
                banner: banner
            });
        }).catch(error => {
            console.log(error)
        });
    }

    function store(req, res) {
        const { filename } = req.file;
        let { title, slug, description, type, status } = req.body;

        Banner.create({
            title,
            slug,
            description,
            type,
            status,
            image: filename
        }).then(response => {
            return res.status(201).send({
                status: 1,
                message: 'Banner cadastrado com sucesso',
                banner: {
                    id: response.id,
                    title: response.title,
                    slug: response.slug,
                    description: response.description,
                    image: response.image,
                    image_url: response.image_url,
                    type: response.type,
                    status: response.status,
                    request: {
                        type: 'GET',
                        description: 'Buscar banner',
                        url: 'http://localhost:3333/banner/' + response.id
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
        const { id_banner } = req.params;
        let { title, slug, description, type, status } = req.body
        let update = {};

        if (title) {
            update.title = title;
        }

        if (slug) {
            update.slug = slug;
        }

        if (description) {
            update.description = description;
        }

        if (type) {
            update.type = type;
        }

        if (status === 1 || status === 0) {
            update.status = status;
        }

        Banner.update(update, {
            where: {
                id: id_banner
            }
        }).then(response => {
            let communication = {
                status: response[0],
                code: 202,
                message: 'Banner alterado com sucesso'
            }

            if (! communication.status) {
                communication.code = 500;
                communication.message = 'Erro ao alterar o banner'
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
        const { id_banner } = req.params;

        Banner.destroy({
            where: {
                id: id_banner
            }
        }).then(response => {
            let communication = {
                status: response,
                code: 202,
                message: 'Banner deletado com sucesso'
            }

            if (! communication.status) {
                communication.code = 500;
                communication.message = 'Erro ao deletado o banner'
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

module.exports = createBannerController;