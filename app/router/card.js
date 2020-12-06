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
                date = new Date(request.payload.deadline).toISOString();
            } catch (error) {
                console.log(error.message);
                return { message: "Invalid date format" };
            }
            const response = await handlers.addCard(request);
            return h.response({ "message": response });
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
    }
]