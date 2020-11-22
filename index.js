'use strict';
const Hapi = require('@hapi/hapi');
const { Exception } = require('handlebars');
const Jwt = require('@hapi/jwt');
const routes = require('./app/router/index.js');
require('dotenv').config();

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost',
        debug: { request: ['error'] }
    });

    await server.register({
        plugin: require('hapi-plugin-mysql'),
        options: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'trello'
        }
    });

    await server.register(Jwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.HASHKEY,
        verify: {
            aud: false,
            iss: process.env.ISS,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15
        },
        validate: false
    });
    server.auth.default('jwt');

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();