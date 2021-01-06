'use strict';
const handlers = require('../handlers/user_board_enrollments/user_board_enrollments');
const Joi = require('Joi');

module.exports = [
    {
        method: 'POST',
        path: '/user_board_enrollments/insert',
        handler: async (request, h) => {
            console.log(request)
            const response1 = await handlers.createUserBoardEnrollment(request);
            return h.response(response1);
        }
    }
]