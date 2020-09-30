const express = require('express');
const cors = require('cors');
const path = require('path');

function createServer() {
    function start() {
        console.log('> [server] Starting...');
        const server = new express()
        server.use(cors({origin: 'http://localhost:3333'}))
        server.use(express.json());
        server.use('/files', express.static(path.resolve(__dirname, '..', '..', 'uploads')));
        console.log('> [server] Starting done!');

        return server;
    }

    function stop() {
        console.log('> [server] Stopping...');
        console.log('> [server] Stopping done!');
    }

    return {
        start,
        stop
    }
}

module.exports = createServer;