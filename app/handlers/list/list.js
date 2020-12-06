const ListDAO = require('../../dao/list');
const BoardDAO = require('../../dao/board');

async function getList(request) {
    let listDao = new ListDAO(request.app.db);
    return listDao.getAllForBoard(request.params.boardID);
}

async function addList(request) {
    let listDao = new ListDAO(request.app.db);
    let boardDao = new BoardDAO(request.app.db);

    let boards = await boardDao.findByUserId(request.auth.credentials.id);
    if(!checkIfUserHasAccessToBoard(boards, request.payload.boardID)) {
        return "User has no access to the board.";
    }

    let message = await listDao.addListToBoard(request.payload.boardID, request.payload.title);
    return message;
}

async function deleteList(request) {
    let listDao = new ListDAO(request.app.db);
    let boardDao = new BoardDAO(request.app.db);

    let list = await listDao.findById(request.payload.listID);
    if(list == null || list.length === 0) {
        return "List with that id dosent exist.";
    }

    let boards = await boardDao.findByUserId(request.auth.credentials.id);
    if(!checkIfUserHasAccessToBoard(boards, list.BoardID)) {
        return "User has no access to the board.";
    }

    return await listDao.deleteListFromBoard(request.payload.listID);
}

async function editListName(request) {
    let listDao = new ListDAO(request.app.db);
    let boardDao = new BoardDAO(request.app.db);

    let list = await listDao.findById(request.payload.listID);
    if(list == null || list.length === 0) {
        return "List with that id dosent exist.";
    }

    let boards = await boardDao.findByUserId(request.auth.credentials.id);
    if(!checkIfUserHasAccessToBoard(boards, list.BoardID)) {
        return "User has no access to the board.";
    }
    
    return await listDao.editListName(request.payload.listID, request.payload.newTitle);
}

function checkIfUserHasAccessToBoard(boards, boardIdToCheckAccessTo) {
    return boards.filter(board => board.ID === boardIdToCheckAccessTo).length > 0;
}

module.exports.getList = getList;
module.exports.addList = addList;
module.exports.deleteList = deleteList;
module.exports.editListName = editListName;