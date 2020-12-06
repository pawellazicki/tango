const user = require('./user');
const board = require('./board');
const list = require('./list');
const card = require('./card');

module.exports = [].concat(user, board, list, card);