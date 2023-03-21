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

const orderCreateSchema = joi.object({
    "client_name": joi.string().min(1).required(),
    "client_mail": joi.string().email().required(),
    "delivery": joi.object({
        // "date": joi.date().required(),
        "date": joi.date().min(new Date()).required(),
        "time": joi.string().required()
    }).required(),
    "items": joi.array().items(joi.object({
        "uri": joi.string().required(),
        "q": joi.number().integer().min(1).required(),
        "name": joi.string().required(),
        "price": joi.number().min(0).required()
    })).required()
})

function validateOrderCreate(order, res, req, next) {
    const result = orderCreateSchema.validate(order);
    let error = false
    if (result.error) {
        error = true
        console.log("Error: " + result.error)
        next(result.error)
    }
    return !error
}

module.exports = {
    validateAuth,
    validateSignIn,
    validateMail,
    validateOrderCreate
}