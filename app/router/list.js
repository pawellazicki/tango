'use strict';
const handlers = require('../handlers/list/list');
const Joi = require('Joi');

module.exports = [
    {
        method: 'GET',
        path: '/lists/{boardID}',
        handler: async (request, h) => {
            const response = await handlers.getList(request);
            return h.response(response);
        }

    }
]