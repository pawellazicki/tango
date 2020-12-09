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
    },
    {
        method: 'POST',
        path: '/lists/add',
        handler: async (request, h) => {
            const response = await handlers.addList(request);
            return h.response({"message":response});
        },
        options: {
            validate: {
                payload: Joi.object({
                    boardID: Joi.number().required(),
                    title: Joi.string().min(1).max(140).required(),
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/lists/delete',
        handler: async (request, h) => {
            const response = await handlers.deleteList(request);
            return h.response({"message":response});
        },
        options: {
            validate: {
                payload: Joi.object({
                    listID: Joi.number().required(),
                })
            }
        }
    },
    {
        method: 'PATCH',
        path: '/lists/edit',
        handler: async (request, h) => {
            const response = await handlers.editListName(request);
            return h.response({"message":response});
        },
        options: {
            validate: {
                payload: Joi.object({
                    listID: Joi.number().required(),
                    newTitle: Joi.string().min(1).max(140).required(),
                })
            }
        }
    }
]