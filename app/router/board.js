'use strict';
const handlers = require('../handlers/board/board');
const Joi = require('Joi');

module.exports = [
    {
        method: 'POST',
        path: '/boards/insert',
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
        path: '/boards',
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