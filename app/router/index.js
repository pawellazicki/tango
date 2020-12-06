const user = require('./user');
const board = require('./board');
const list = require('./list');

module.exports = [].concat(user, board, list);