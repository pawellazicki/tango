'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const data = [
        { id: 1, name: 'Alex', age: 21 },
        { id: 2, name: 'Alice', age: 23 }
    ];

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    await server.register(require('@hapi/vision'));

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


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();