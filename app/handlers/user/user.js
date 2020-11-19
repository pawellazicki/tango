const UserDAO = require('../../dao/user');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');

async function checkCreds(request) {
    userDAO = new UserDAO(request.app.db);
    userSchema = await userDAO.find(request.payload.username);

    if(bcrypt.compareSync(request.payload.password, userSchema.password)) {
        return createToken(request.payload.username);
    } 

    return '';
}

function createToken(username) {
    const token = Jwt.token.generate(
        {
            username: username,
            iss: process.env.ISS
        },
        {
            key: process.env.HASHKEY,
            algorithm: 'HS512'
        },
        {
            ttlSec: 14400 // 4 hours
        }
    );

    return token;
}

module.exports.checkCreds = checkCreds;