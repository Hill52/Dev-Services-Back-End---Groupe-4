const joi = require('joi');

const orderSchema = joi.object({
    nom: joi.string().min(1).required(),
    livraison: joi.date().required(),
    mail: joi.string().email().required()
})

const orderCreateSchema = joi.object({
    "client_name": joi.string().min(1).required(),
    "client_mail": joi.string().email().required(),
    "delivery": joi.object({
        "date": joi.date().required(),
        "time": joi.string().required()
    }).required(),
    "items": joi.array().items(joi.object({
        "uri": joi.string().required(),
        "q": joi.number().integer().min(1).required(),
        "name": joi.string().required(),
        "price": joi.number().min(0).required()
    })).required()
})

const mailSchema = joi.object({
    "mail": joi.string().email().required()
})

function validateOrder(order, res, req, next) {
    const result = orderSchema.validate(order);
    if (result.error) {
        // next(result.error);
        res.status(400).json({
            type: "error",
            error: 400,
            message: result.error.details[0].message
        });
    } 
}

function validateOrderCreate(order, res, req, next) {
    const result = orderCreateSchema.validate(order);
    if (result.error) {
        next(result.error);
    }
}

function validateMail(mail, res, req, next) {
    const result = mailSchema.validate(mail);
    if (result.error) {
        res.status(400).json({
            type: "error",
            error: 400,
            message: result.error.details[0].message
        });
    }
}

module.exports = {
    validateOrder,
    validateOrderCreate,
    validateMail,
}