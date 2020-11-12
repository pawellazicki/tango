'use strict';

const Hapi = require('@hapi/hapi');
const { Exception } = require('handlebars');
const MySQL = require('mysql');

const init = async () => {

    const connection = MySQL.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'trello'
    });

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    await server.register(require('@hapi/vision'));

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


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();