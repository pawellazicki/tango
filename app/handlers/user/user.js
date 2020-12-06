const UserDAO = require('../../dao/user');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const saltRounds = process.env.SALTROUNDS;

async function checkCreds(request) {
    userDAO = new UserDAO(request.app.db);
    userSchema = await userDAO.find(request.payload.username);

    if(bcrypt.compareSync(request.payload.password, userSchema.password)) {
        return {
            "token": createToken(request.payload.username),
            "user_id": userSchema.id
        }
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

async function createUser(request) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(request.payload.password, salt);
    userDAO = new UserDAO(request.app.db);

    isRegistred = await userDAO.find(request.payload.username);
    if(isRegistred != null) {
        return {
            "code": "401",
            "message": "user exists"
        };
    }

    user = {
        username: request.payload.username,
        password: hash,
        email: request.payload.email
    }

    userDAO.save(user); 
    const token = createToken(request.payload.username);
    
    return {
        "code": "200",
        "token": token,
        "message": "user created"
    };
}

module.exports.checkCreds = checkCreds;
module.exports.createUser = createUser;