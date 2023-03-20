const express = require("express");
const router = express.Router();

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const db = require("../db/client.js");

const validator = require("../validator/validator.js");

router.use(express.json());

router.post("/", async (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];

    try {
        // let result = await db.getClientByToken(token);
        // if (result.length == 0) {
        //     res.status(400).json({
        //         type: "error",
        //         error: 400,
        //         message: "L'utilisateur n'existe pas"
        //     });
        //     return
        // }
        // res.status(200).json({
        //     type: "success",
        //     error: 200,
        //     message: "L'utilisateur existe"
        // });

        res.status(200).json({
            type: "success",
            error: 201,
            message: "L'utilisateur existe"
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;