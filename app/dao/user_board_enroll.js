const bcrypt = require('bcrypt');

const user_board_DAO = class user_board_DAO {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async save(board_id, user_id) {
        let values = [
            board_id,
            user_id
        ];
        let sql = 'INSERT INTO USERBOARDENROLLMENTS (USER_ID, BOARD_ID) VALUES (?, ?)'

        return await new Promise((resolve, reject) => {
            this.dbConnection.query({
                sql: sql,
                values: values,
            },
                function (err, results) {
                    if (err) {
                        resolve(results);
                    }

                    resolve(results[0]);
                })
        });
    }
    
    async getBoardUsers(board_id) {
        let values = [
            board_id
        ]
        let sql = 'select * from user U join userboardenrollments E on U.id = E.user_id  AND E.board_id = ?'
        return await new Promise((resolve, reject) => {
            this.dbConnection.query({
                sql: sql,
                values: values,
            },
                function (err, results) {
                    if (err) {
                        reject(results);
                    }

                    resolve(results);
                })
        });
    }
    
    async getUserBoards(user_id) {
        let values = [
            user_id
        ]
        let sql = 'select * from user U join userboardenrollments E on U.id = E.user_id  AND E.user_id = ?'
        return await new Promise((resolve, reject) => {
            this.dbConnection.query({
                sql: sql,
                values: values,
            },
                function (err, results) {
                    if (err) {
                        reject(results);
                    }

                    resolve(results);
                })
        });
    }
    
    async removeEnroll(user_id, board_id) {
        let values = [
            user_id,
            board_id
        ]
        let sql = 'delete from userboardenrollments WHERE user_id = ? and board_id = ?'
        return await new Promise((resolve, reject) => {
            this.dbConnection.query({
                sql: sql,
                values: values,
            },
                function (err, results) {
                    if (err) {
                        reject(results);
                    }

                    resolve(results);
                })
        });
    }
}

module.exports = user_board_DAO;