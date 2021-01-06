const BoardDAO = require('../../dao/user_board_enroll');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const saltRounds = process.env.SALTROUNDS;

async function createUserBoardEnrollment(request) {
    userBoardDAO = new user_board_DAO(request.app.db);

    userBoardDAO.save(request.payload.user_id, request.payload.board_id);

    return {
        "code": "200",
        "message": "enrollment created"
    };
}

module.exports.createUserBoardEnrollment = createUserBoardEnrollment;
