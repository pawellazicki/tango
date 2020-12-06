'use strict';
const handlers = require('../handlers/board/board');
const Joi = require('Joi');

module.exports = [
    {
        method: 'POST',
        path: '/boards/insert/{user_id}',
        handler: async (request, h) => {
            const response1 = await handlers.createBoard(request);
            return h.response(response1);
        },
        options: {
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(1).max(50).required(),
                    team_name: Joi.string().min(1).required(),
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/boards/{user_id}',
        handler: async (request, h) => {
            return await getBoards(request);
        }
    },
    {
        method: 'DELETE',
        path: '/boards/remove',
        handler: async (request, h) => {
            const response1 = await handlers.removeBoard(request);
            return h.response(response1);
        }
    },
    {
        method: 'PUT',
        path: '/board/update',
        handler: async (request, h) => {
            const response1 = await handlers.updateBoard(request);
            return h.response(response1);
        }
    },
    {
        method: 'GET',
        path: '/board/{id}',
        handler: async (request, h) => {
            const response = await handlers.getBoard(request);
            return h.response(response);
        }
    }
]

function getBoards(request) {
    return new Promise((resolve, reject) => {
        request.app.db.query(`SELECT * FROM board WHERE USER_ID = ${request.params.user_id}`, [], function (err, results) {
            if (err) {
                return reject(error)
            }
            return resolve(results);
        })
    })
}