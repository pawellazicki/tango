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
    if (requestingList == null || requestingList.BoardID == null) {
        return { message: "List dosent exist" };
    }
    let boardIdOfRequestingListId = requestingList.BoardID;
    if (!utils.checkIfUserHasAccessToBoard(userBoardsAccess, boardIdOfRequestingListId)) {
        return { message: "User has no access to the board." };
    }

    return cardDao.findAllByListId(request.params.listID);
}

async function addCard(request) {
    let cardDao = new CardDAO(request.app.db);
    let listDao = new ListDAO(request.app.db);
    let boardDao = new BoardDAO(request.app.db);

    let userBoardsAccess = await boardDao.findByUserId(request.auth.credentials.id);
    let requestingList = await listDao.findById(request.payload.listID);
    console.log(requestingList);
    if (requestingList == null || requestingList.BoardID == null) {
        return { message: "List dosent exist" };
    }
    let boardIdOfRequestingListId = requestingList.BoardID;
    if (!utils.checkIfUserHasAccessToBoard(userBoardsAccess, boardIdOfRequestingListId)) {
        return { message: "User has no access to the board." };
    }

    card = {
        listID: request.payload.listID,
        cardName: request.payload.cardName,
        deadline: request.payload.deadline
    };

    return { message: await cardDao.save(card) };
}

async function deleteCard(request) {
    let cardDao = new CardDAO(request.app.db);
    let listDao = new ListDAO(request.app.db);
    let boardDao = new BoardDAO(request.app.db);

    let card = await cardDao.findById(request.payload.cardID);
    if (card == null) {
        return { message: "Card doesnt exist" };
    }

    let requestingList = await listDao.findById(card.ListID);
    let userBoardsAccess = await boardDao.findByUserId(request.auth.credentials.id);
    if (requestingList == null || requestingList.BoardID == null) {
        return { message: "List doesnt exist" };
    }

    let boardIdOfRequestingListId = requestingList.BoardID;
    if (!utils.checkIfUserHasAccessToBoard(userBoardsAccess, boardIdOfRequestingListId)) {
        return { message: "User has no access to the card." };
    }

    return { message: await cardDao.remove(request.payload.cardID) };
}

async function editCard(request) {
    let cardDao = new CardDAO(request.app.db);
    let listDao = new ListDAO(request.app.db);
    let boardDao = new BoardDAO(request.app.db);

    let card = await cardDao.findById(request.payload.cardID);
    if(card == null) {
        return { message: "Card doesnt exist" };
    }

    let requestingList = await listDao.findById(card.ListID);
    let userBoardsAccess = await boardDao.findByUserId(request.auth.credentials.id);
    if(requestingList == null || requestingList.BoardID == null) {
        return { message: "List doesnt exist" };
    }

    let boardIdOfRequestingListId = requestingList.BoardID;
    if(!utils.checkIfUserHasAccessToBoard(userBoardsAccess, boardIdOfRequestingListId)) {
        return { message: "User has no access to the card." };
    }
   
    return { message: await cardDao.editCardName(request.payload.cardID, request.payload.newCardName) };
}

module.exports.getCards = getCards;
module.exports.addCard = addCard;
module.exports.deleteCard = deleteCard;
module.exports.editCard = editCard;