const joi = require('joi');

const orderSchema = joi.object({
    nom: joi.string().min(1).required(),
    livraison: joi.date().required(),
    mail: joi.string().email().required()
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

module.exports = {
    validateOrder
}