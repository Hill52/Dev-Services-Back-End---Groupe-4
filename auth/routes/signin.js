const express = require("express");
const router = express.Router();

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const db = require("../db/client.js");

const validator = require("../validator/validator.js");

router.use(express.json());

router.post("/", async (req, res, next) => {
    let client_name = req.body.client_name;
    let password = req.body.password;

    try {
        let result = await db.authentification(client_name, password);
        if (result == false) {
            res.status(400).json({
                type: "error",
                error: 400,
                message: "Login ou mot de passe incorrect"
            });
            return
        }

        let jwtSecret = "ceciestun_secretjwt"

        let token = jwt.sign({ id: result.id }, jwtSecret, {
            expiresIn: 3600 // expires in 1 hour
        });

        res.status(200).json({
            auth: true,
            token: token,
            refresh_token: result.refresh_token
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;