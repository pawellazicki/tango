'use strict';
const handlers = require('../handlers/user/user');
const Joi = require('Joi');
const bcrypt = require('bcrypt');
const saltRounds = process.env.PORT;

module.exports = [
    {
        method: 'POST',
        path: '/auth/signin',
        handler: async (request, h) => {
            const token = await handlers.checkCreds(request);

            if(token === '' || token == null) {
                return h.response({message: "Bad creds"});
            }

            const response = h.response({token: token});
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
            
            return h.response({"message": "User created"});
        },
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    username: Joi.string().min(4).max(50).required(),
                    password: Joi.string().min(5).required(),
                    password_2: Joi.string().min(5).required(),
                })
            }
        }
    }
]

function createPassword(plainPass) {
    return bcrypt.hashSync(plainPass, saltRounds); 
}