const CardDAO = require('../../dao/card');
const ListDAO = require('../../dao/list');
const BoardDAO = require('../../dao/board');
const utils = require('./../utils');

async function getCards(request) {
    let cardDao = new CardDAO(request.app.db);
    let listDao = new ListDAO(request.app.db);
    let boardDao = new BoardDAO(request.app.db);

    let userBoardsAccess = await boardDao.findByUserId(request.auth.credentials.id);
    let requestingList = await listDao.findById(request.params.listID);
    if(requestingList == null || requestingList.BoardID == null) {
        return { message: "List dosent exist" };
    }
    let boardIdOfRequestingListId = requestingList.BoardID;
    if(!utils.checkIfUserHasAccessToBoard(userBoardsAccess, boardIdOfRequestingListId)) {
        return { message: "User has no access to the board." };
    }

    return cardDao.findAllByListId(request.params.listID);
}

module.exports.getCards = getCards;