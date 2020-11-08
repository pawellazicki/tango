const Joi = require('joi');

const UserModel = Joi.object({
    username: Joi.string()
        .max(255),

    password: Joi.string()
        .max(255)
});

module.exports = UserModel;