'use strict';

const Hapi = require('@hapi/hapi');
const MySQL = require('mysql');

const init = async () => {

    const connection = MySQL.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'world'
    });

    const data = [
        { id: 1, name: 'Alex', age: 21 },
        { id: 2, name: 'Alice', age: 23 }
    ];

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

    function getFirstCity() {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM city', [], function (err, results) {
            if (err) {
              return reject(error)
            }

            console.log(results[0]);
      
            return resolve(results[0]);
          })
        })
      }

    server.route({
        method: 'GET',
        path: '/city',
        handler: async (request, h) => {
            // maybe add some error handling here
            return await getFirstCity();
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