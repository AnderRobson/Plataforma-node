const express = require('express');
const multer = require('multer');
const BannerController = require('../controllers/BannerController');
const createUpload = require('../config/upload');

function createBannerRoutes (configurations = {}) {
    const routes = express.Router();
    const uploadConfig = createUpload()
    const bannerUpload = uploadConfig.start('banner')

    async function start() {
        const BannerRoutes = await BannerController();
        const upload = multer(bannerUpload);

        routes.get('/', (req, res) => {
            return BannerRoutes.index(req, res);
        });

        routes.get('/:id_banner', (req, res) => {
            return BannerRoutes.show(req, res);
        });

        routes.post('/', upload.single('image'), (req, res) => {
            return BannerRoutes.store(req, res);
        });

        routes.patch('/:id_banner', (req, res) => {
            return BannerRoutes.update(req, res);
        });

        routes.delete('/:id_banner', (req, res) => {
            return BannerRoutes.destroy(req, res);
        });

        return routes;
    }

    function stop() {

    }

    return {
        start,
        stop
    }
}

module.exports = createBannerRoutes;