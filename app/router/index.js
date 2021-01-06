const user = require('./user');
const board = require('./board');
const list = require('./list');
const card = require('./card');
const user_board_enrollments = require('./user_board_enrollments');

module.exports = [].concat(user, board, list, card, user_board_enrollments);