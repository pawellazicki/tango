const bcrypt = require('bcrypt');

const UserDAO = class UserDAO {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    async find(username) {
        let values = [
            username
        ];

        let sql =   'SELECT id, username, password FROM user AS u '+
		            'WHERE u.username = ? '

        return await new Promise((resolve, reject) => {
            this.dbConnection.query({
                sql: sql, 
                values: values,
            }, 
            function (err, results) {
                if (err) {
                    resolve({});
                }

                resolve(results[0]);
            })
        });
    }

    async save(user) {
        let values = [
            user.username,
            user.password,
            user.email
        ];

        let sql =   'INSERT INTO USER (username, password, email) VALUES (?, ?, ?)'

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
}

module.exports = UserDAO;