const handlers = require('../handlers/user/user');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: handlers.userHome,
    },
    {
        method: 'GET',
        path: '/city',
        handler: async (request, h) => {
            const database = request.getDatabase();
            return handlers.getFirstCity(database);
        }
    },
    {
        method: 'GET',
        path: '/mock',
        handler: (request, h) => {
            return { data };
        }
    }
]