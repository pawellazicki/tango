'use strict';
const Hapi = require('@hapi/hapi');
<<<<<<< HEAD
const { Exception } = require('handlebars');
=======
const Jwt = require('@hapi/jwt');
>>>>>>> jwt auth
const MySQL = require('mysql');
const routes = require('./app/router/index.js');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        debug: { request: ['error'] }
    });

    const connection = MySQL.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
<<<<<<< HEAD
        database: 'trello'
=======
        database: 'trello2'
>>>>>>> db
    });

    await connection.connect();
    server.decorate('request', 'getDatabase', () => { return connection; });

    await server.register(Jwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: 'my_secret$$!gf21!#!GT$@dddddddddddddddddddddddddddddddddddddddddddddddddd!!FDFS',
        verify: {
            aud: false,
            iss: 'https://trello.tango2.pl',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15
        },
        validate: false
    });
    server.auth.default('jwt');

<<<<<<< HEAD
    connection.connect();

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.view("index", { title: 'tango2' });
        }
    });

    server.route({
        method: 'GET',
        path: '/mock',
        handler: (request, h) => {
            return { data };
        }
    });

    function getBoards() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM board', [], function (err, results) {
                if (err) {
                    return reject(error)
                }
                return resolve(results);
            })
        })
    }

    server.route({
        method: 'GET',
        path: '/boards',
        handler: async (request, h) => {
            // maybe add some error handling here
            return await getBoards();
        }
    });
=======
    server.route(routes);
>>>>>>> refactor

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();