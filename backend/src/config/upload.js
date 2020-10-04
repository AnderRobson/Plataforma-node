const multer = require('multer');
const path = require('path');

function createUpload() {
    function start(folder) {
        const upload = {
            storage: multer.diskStorage({
                destination: path.resolve(__dirname, '..', '..', 'uploads', folder),
                filename: (req, file, callback) => {
                    const extension = path.extname(file.originalname);
                    const name = path.basename(file.originalname, extension);
                    callback(null, `${name}-${Date.now()}${extension}`);
                }
            })
        }

        return upload;
    }

    function stop() {

    }

    return {
        start,
        stop
    }
}

module.exports = createUpload;