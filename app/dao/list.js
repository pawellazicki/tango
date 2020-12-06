const bcrypt = require('bcrypt');

const ListDAO = class ListDAO {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async getAllForBoard(id) {
        let values = [
            id
        ]
        let sql = 'SELECT * FROM trelloList T JOIN board B ON B.id = T.boardID AND T.boardID = ?'
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

module.exports = ListDAO;