'use strict';
const handlers = require('../handlers/user/user');
const Joi = require('Joi');

module.exports = [
    {
        method: 'POST',
        path: '/auth/signin',
        handler: async (request, h) => {
            const result = await handlers.checkCreds(request);
            
            if(result.token === '' || result.token == null) {
                return h.response({message: "Bad creds"});
            }

            const response = h.response({
                token: result.token,
                user_id: result.user_id
            });
            response.type('application/json');
            return response;
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    username: Joi.string().min(1).max(140).required(),
                    password: Joi.string().min(1).required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/auth/signup',
        handler: async (request, h) => {
            const response1 = await handlers.createUser(request);
            return h.response(response1);
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    username: Joi.string().min(4).max(50).required(),
                    password: Joi.string().min(5).required(),
                    password_2: Joi.string().min(5).required(),
                    email: Joi.string().email().required()
                })
            }
        }
    }
]

