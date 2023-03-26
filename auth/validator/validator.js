const joi = require('joi');

const authSchema = joi.object({
    mail: joi.string().email().required(),
    client_name: joi.string().required(),
    password: joi.string().required(),
    passwordConfirm: joi.string().required(),
})

function validateAuth(auth, res, req, next) {
    const result = authSchema.validate(auth);
    if (result.error) {
        console.log("error: ", result.error)
        next(result.error)
    }
}

module.exports = {
    validateAuth
}