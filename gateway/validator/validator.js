const joi = require('joi');

const authSchema = joi.object({
    mail: joi.string().email().required(),
    client_name: joi.string().required(),
    password: joi.string().required(),
    passwordConfirm: joi.valid(joi.ref('password'))
})

function validateAuth(auth, res, req, next) {
    const result = authSchema.validate(auth);
    if (result.error) {
        next(result.error)
    }
}

const signInSchema = joi.object({
    client_name: joi.string().required(),
    password: joi.string().required()
})

function validateSignIn(signIn, res, req, next) {
    const result = signInSchema.validate(signIn);
    if (result.error) {
        next(result.error)
    }
}

const mailSchema = joi.object({
    mail: joi.string().email().required()
})

function validateMail(mail, res, req, next) {
    const result = mailSchema.validate(mail);
    if (result.error) {
        next("Enter a mail for c query !")
    }
}

module.exports = {
    validateAuth,
    validateSignIn,
    validateMail
}