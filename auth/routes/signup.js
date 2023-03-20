const express = require("express");
const router = express.Router();

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const db = require("../db/client.js");

const validator = require("../validator/validator.js");

router.use(express.json());

router.post("/", async (req, res, next) => {
    let mail = req.body.mail;
    let client_name = req.body.client_name;

    if (mail == undefined || client_name == undefined || req.body.password == undefined || req.body.passwordConfirm == undefined) {
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

    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);
    let passwordConfirm = await bcrypt.hash(req.body.passwordConfirm, salt);

    try {
        let verif = await db.getClientByMail(mail);

        if (verif.length != 0) {
            res.status(400).json({
                type: "error",
                error: 400,
                message: "L'utilisateur existe déjà"
            });
            return
        }

        let user = {
            client_name: client_name,
            mail: mail,
            password: password,
            passwordConfirm: passwordConfirm,
        };
    
        validator.validateAuth(user, res, req, next);
    
        let result = await db.createClient(user);
    
        if (result.error) {
            res.status(400).json(result);
            return
        }  

        let jwtSecret = "ceciestun_secretjwt"

        let token = jwt.sign({ id: result.id }, jwtSecret, {
            expiresIn: 3600 // expires in 1 hour
        });

        res.status(200).json({ auth: true, token: token, refresh_token: result.refresh_token });

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;