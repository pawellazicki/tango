const bcrypt = require('bcrypt');

const BoardDAO = class BoardDAO {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async save(board) {
        let values = [
            board.title,
            board.team_name
        ];
        let sql = 'INSERT INTO BOARD (TITLE, TEAM_NAME) VALUES (?, ?)'

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

    async remove(id) {
        let values = [
            id
        ]
        let sql = 'DELETE FROM BOARD WHERE ID = ?'
        return await new Promise((resolve, reject) => {
            this.dbConnection.query({
                sql: sql,
                values: values,
            },
                function (err, results) {
                    if (err) {
                        resolve(results);
                    }

                    resolve(results);
                })
        });
    }
}

module.exports = BoardDAO;