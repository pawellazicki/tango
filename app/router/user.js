'use strict';
const handlers = require('../handlers/user/user');
const Joi = require('Joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Jwt = require('@hapi/jwt');

var db = [
    {
        username: "damian",
        password: "$2b$10$x6JNpzHeFXt7qR88prwVae0wSHfsLi4LsnB6dXMg6xi42SmRErfSO"
    },
    {
        username: "patyk",
        password: "$2b$10$GTta9RWWEO3wZpmkEoKBAuI6UOITHYW3zUCJcWBpWQWndKW.OzUIq"
    },
    {
        username: "trello",
        password: "$2b$10$Noq34eIWcux.KdAbkQ3S/uokkAbPcUWEcKYpC8jvqwNunl864VBx2"
    }
]

module.exports = [
    {
        method: 'GET',
        path: '/gettoken',
        options: {
            auth: false
        },
        handler: async (request, h) => {

            return createToken("siema");
        },
    },
    {
        method: 'GET',
        path: '/showusers',
        options: {
            auth: false
        },
        handler: async (request, h) => {
            return db;
        },
    },
    {
        method: 'GET',
        path: '/{pass}/',
        options: {
            auth: false
        },
        handler: async (request, h) => {

            var hashToBeReturned = {};

            hashToBeReturned = await createPassword(request.params.pass);

            return request.params.pass + " = " + hashToBeReturned;
        },
    },
    {
        method: 'POST',
        path: '/city',
        handler: (request, h) => {
            return handlers.userHome(request, h)
        }
    },
    {
        method: 'POST',
        path: '/auth/signin',
        handler: async (request, h) => {
            for (const user of db){
                if(user.username === request.payload.username && bcrypt.compareSync(request.payload.password, user.password)) {
                    var token = createToken(request.payload.username, request.payload.password);
                    console.log("User " + user.username + " just logged in");
                    const response = h.response({token: token});
                    response.type('application/json');
                    return response;
                }
            }
            return h.response('Bad Creads');;
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
            for (const user of db){
                if(user.username === request.payload.username) {
                    return h.response({"message": "User exists"});
                }
            }

            db.push({
                "username": request.payload.username,
                "password": await createPassword(request.payload.password)
            });

            return h.response({"message": "User created"});
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
    }
]



function createToken(username) {
    const token = Jwt.token.generate(
        {
            username: username,
            iss: 'https://trello.tango2.pl'
        },
        {
            key: 'my_secret$$!gf21!#!GT$@dddddddddddddddddddddddddddddddddddddddddddddddddd!!FDFS',
            algorithm: 'HS512'
        },
        {
            ttlSec: 14400 // 4 hours
        }
    );

    return token;
}

async function createPassword(plainPass) {
    return new Promise((resolve) => {
        bcrypt.hash(plainPass, saltRounds, function(err, hash) {
            resolve(hash);
        })
    }); 
}