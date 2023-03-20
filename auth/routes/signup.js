const express = require("express");
const router = express.Router();

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const db = require("../db/client.js");

const validator = require("../validator/validator.js");

router.use(express.json());

router.post("/", async (req, res, next) => {
    let mail = req.body.mail;
    let client_mail = req.body.client_mail;

    if (mail == undefined || client_mail == undefined || req.body.password == undefined || req.body.passwordConfirm == undefined) {
        res.status(400).json({
            type: "error",
            error: 400,
            message: "Les champs ne sont pas tous remplis"
        });
        return
    }

    if (req.body.password != req.body.passwordConfirm) {
        res.status(400).json({
            type: "error",
            error: 400,
            message: "Les mots de passe ne correspondent pas"
        });
        return
    }

    let password = await bcrypt.hash(req.body.password, 10);
    let passwordConfirm = await bcrypt.hash(req.body.passwordConfirm, 10);

    try {
        let user = {
            client_mail: client_mail,
            mail: mail,
            password: password,
            passwordConfirm: passwordConfirm,
        };
    
        // validator.validateAuth(user, res, req, next);
    
        let result = await db.createClient(user);
    
        if (result.error) {
            res.status(400).json({
                type: "error",
                error: 400,
                message: "L'utilisateur existe déjà"
            });
            return
        }  

        let jwtSecret = "ceciestun_secretjwt"

        // let token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
            console.log("result: " + result);
        let token = jwt.sign({ id: result }, jwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).json({ auth: true, token: token });

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;