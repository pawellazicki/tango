'use strict';
const handlers = require('../handlers/card/card');
const Joi = require('Joi');

module.exports = [
    {
        method: 'GET',
        path: '/cards/{listID}',
        handler: async (request, h) => {
            const response = await handlers.getCards(request);
            return h.response(response);
        }
    },
]