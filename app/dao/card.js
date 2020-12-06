
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
}

module.exports = CardDAO;