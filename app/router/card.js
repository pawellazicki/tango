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
    {
        method: 'POST',
        path: '/cards/add',
        handler: async (request, h) => {
            let date;
            try {
                var dateNow = new Date();
                date = new Date(request.payload.deadline);

                if (dateNow.getTime() > date.getTime()) {
                    return { message: "Deadline is in the past" };
                }

                date = date.toISOString();

            } catch (error) {
                console.log(error.message);
                return { message: "Invalid date format" };
            }
            const response = await handlers.addCard(request);
            return h.response(response);
        },
        options: {
            validate: {
                payload: Joi.object({
                    listID: Joi.number().required(),
                    cardName: Joi.string().min(1).max(140).required(),
                    deadline: Joi.string().required(),
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/cards/delete',
        handler: async (request, h) => {
            const response = await handlers.deleteCard(request);
            return h.response(response);
        },
        options: {
            validate: {
                payload: Joi.object({
                    cardID: Joi.number().required(),
                })
            }
        }
    },
    {
        method: 'PATCH',
        path: '/cards/edit',
        handler: async (request, h) => {
            const response = await handlers.editCard(request);
            return h.response(response);
        },
        options: {
            validate: {
                payload: Joi.object({
                    cardID: Joi.number().required(),
                    newCardName: Joi.string().min(1).max(140).required(),
                })
            }
        }
    },
    {
        method: 'PATCH',
        path: '/cards/updateLabel',
        handler: async (request, h) => {
            const response = await handlers.updateLabels(request);
            return h.response(response);
        },
        options: {
            validate: {
                payload: Joi.object({
                    cardID: Joi.number().required(),
                    colors: Joi.string().max(10).allow(""),
                })
            }
        }
    }
]