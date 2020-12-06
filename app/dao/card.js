
const CardDAO = class CardDAO {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async findAllByListId(listId) {
        let values = [
            listId
        ]

        let sql = 'SELECT * FROM Card WHERE ListID = ?'
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
                resolve(results);
            })
        });
    }

    async save(card) {
        let values = [
            card.listID,
            card.cardName,
            card.deadline,
        ]

        let sql = 'INSERT INTO Card (ListID, CardName, Deadline) VALUES (?, ?, ?)'
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

        return "Card added";
    }

    async findById(findById) {
        let values = [
            findById
        ]

        let sql = 'SELECT * FROM Card WHERE CardID = ?'
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
                resolve(results[0]);
            })
        });
    }

    async remove(cardID) {
        let values = [
            cardID
        ]

        let sql = 'DELETE FROM Card WHERE CardID = ?'
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

        return "Card deleted";
    }
}

module.exports = CardDAO;