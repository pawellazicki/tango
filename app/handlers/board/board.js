const BoardDAO = require('../../dao/board');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const saltRounds = process.env.SALTROUNDS;

async function createBoard(request) {
    boardDAO = new BoardDAO(request.app.db);

    board = {
        title: request.payload.title,
        team_name: request.payload.team_name
    }

    boardDAO.save(board);

    return {
        "code": "200",
        "message": "board created"
    };
}

async function deleteBoard(request) {
    boardDAO = new BoardDAO(request.app.db);
    boardDAO.remove(request.payload.id)

    return {
        "code": "200",
        "message": "board " + request.payload.id + " deleted"
    };
}

module.exports.createBoard = createBoard;
module.exports.removeBoard = deleteBoard;