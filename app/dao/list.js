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

    async addListToBoard(boardId, listTitle) {
        let values = [
            boardId,
            listTitle
        ]

        let sql = 'INSERT INTO TrelloList (BoardID, ListName) VALUES (?, ?)'
        try {
            await new Promise((resolve, reject) => {
                this.dbConnection.query({
                    sql: sql,
                    values: values,
                },
                function (err, results) {
                    if (err) {
                        reject(err);
                    }
    
                    resolve(results);
                })
            });
        } catch (error) {
            console.error(error);
            return error.code + ": check server log";
        }
        
        return "Correctly added";
    }

    async deleteListFromBoard(listId) {
        let values = [
            listId
        ]

        let sql = 'DELETE FROM TrelloList WHERE ListID = ?'
        try {
            await new Promise((resolve, reject) => {
                this.dbConnection.query({
                    sql: sql,
                    values: values,
                },
                function (err, results) {
                    if (err) {
                        reject(err);
                    }
    
                    resolve(results);
                })
            });
        } catch (error) {
            console.error(error);
            return error.code + ": check server log";
        }
        
        return "Correctly removed";
    }

    async findById(listId) {
        let values = [
            listId
        ]

        let sql = 'SELECT * FROM TrelloList WHERE ListID = ?'
        return await new Promise((resolve, reject) => {
            this.dbConnection.query({
                sql: sql,
                values: values,
            },
            function (err, results) {
                if (err) {
                    reject(err);
                }
                
                results = JSON.parse(JSON.stringify(results));
                results = results[0]
                resolve(results);
            })
        });
    }
}

module.exports = ListDAO;