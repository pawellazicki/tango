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

    boardDAO.save(board, request.params.user_id);

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

async function getBoard(request) {
    boardDAO = new BoardDAO(request.app.db);
    return boardDAO.get(request.params.id)
}


async function updateBoard(request) {
    boardDAO = new BoardDAO(request.app.db);
    
    board = {
        id: request.payload.id,
        title: request.payload.title,
        team_name: request.payload.team_name
    }
    return boardDAO.update(board)
}

module.exports.createBoard = createBoard;
module.exports.removeBoard = deleteBoard;
module.exports.getBoard = getBoard;
module.exports.updateBoard = updateBoard;
