const user_board_DAO = require('../../dao/user_board_enroll');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const saltRounds = process.env.SALTROUNDS;

async function createUserBoardEnrollment(request) {
    userBoardDAO = new user_board_DAO(request.app.db);

    userBoardDAO.save(request.payload.user_id, request.payload.board_id);

    return {
        "code": "200",
        "message": "user connected"
    };
}


async function getBoardUsers(request) {
    userBoardDAO = new user_board_DAO(request.app.db);
    return userBoardDAO.getBoardUsers(request.params.board_id)
}

async function getUserBoards(request) {
    userBoardDAO = new user_board_DAO(request.app.db);
    return userBoardDAO.getUserBoards(request.params.user_id)
}

module.exports.createUserBoardEnrollment = createUserBoardEnrollment;
module.exports.getBoardUsers = getBoardUsers;
module.exports.getUserBoards = getUserBoards;