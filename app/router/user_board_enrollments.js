'use strict';
const handlers = require('../handlers/user_board_enrollments/user_board_enrollments');
const Joi = require('Joi');

module.exports = [
    {
        method: 'POST',
        path: '/user_board_enrollments/insert',
        handler: async (request, h) => {
            const response = await handlers.createUserBoardEnrollment(request);
            return h.response(response);
        }
    },
    {
        method: 'GET',
        path: '/user_board_enrollments/users/{board_id}',
        handler: async (request, h) => {
            const response = await handlers.getBoardUsers(request);
            return h.response(response);
        }
    },
    {
        method: 'GET',
        path: '/user_board_enrollments/boards/{user_id}',
        handler: async (request, h) => {
            const response = await handlers.getUserBoards(request);
            return h.response(response);
        }
    }
]