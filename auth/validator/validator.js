const joi = require('joi');

const authSchema = joi.object({
    mail: joi.string().email().required(),
    // password: joi.string().min(64).max(64).required(),
    // passwordConfirm: joi.string().min(64).max(64).required()
})

function validateAuth(auth, res, req, next) {
    const result = authSchema.validate(auth);
    if (result.error) next(result.error)
}

module.exports = {
    validateAuth
}