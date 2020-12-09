function checkIfUserHasAccessToBoard(boards, boardIdToCheckAccessTo) {
    return boards.filter(board => board.ID === boardIdToCheckAccessTo).length > 0;
}

module.exports.checkIfUserHasAccessToBoard = checkIfUserHasAccessToBoard;