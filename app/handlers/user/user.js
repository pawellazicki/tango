
async function userHome(request, h) {
    const database = request.getDatabase();
    return getFirstCity(database);
}

function getFirstCity(database) {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM city', [], function (err, results) {
            if (err) {
                return reject(error)
            }
            return resolve(results[0]);
        })
    });
}

module.exports.userHome = userHome;