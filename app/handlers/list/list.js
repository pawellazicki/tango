const ListDAO = require('../../dao/list');

async function getList(request) {
    listDao = new ListDAO(request.app.db);
    return listDao.getAllForBoard(request.params.boardID)
}

module.exports.getList = getList;