'use strict';
const handlers = require('../handlers/user/user');
const Joi = require('Joi');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALTROUNDS;

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
    },
    {
        method: 'GET',
        path: '/boards',
        options: {
            auth: false,
        },
        handler: async (request, h) => {
            // maybe add some error handling here
            return await getBoards(request);
        }
    }
]

function getBoards(request) {
    return new Promise((resolve, reject) => {
        request.app.db.query('SELECT * FROM board', [], function (err, results) {
            if (err) {
                return reject(error)
            }
            return resolve(results);
        })
    })
}

function createPassword(plainPass) {
    return bcrypt.hashSync(plainPass, saltRounds); 
}