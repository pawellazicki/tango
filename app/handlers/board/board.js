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

module.exports.createBoard = createBoard;