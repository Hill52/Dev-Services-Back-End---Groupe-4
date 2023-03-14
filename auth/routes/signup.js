const express = require("express");
const router = express.Router();

// var crypto = require('crypto');
var bcrypt = require('bcrypt');

const db = require("../db/client.js");

const validator = require("../validator/validator.js");

router.use(express.json());

router.post("/", async (req, res, next) => {
    let mail = req.body.mail;

    if (mail == undefined || req.body.password == undefined || req.body.passwordConfirm == undefined) {
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

    let user = {
        mail: mail,
        password: password,
        passwordConfirm: passwordConfirm,
    };

    validator.validateAuth(user, res, req, next);

    let clients = await db.getClients();
    console.log(clients);

    res.status(200).json({
        type: "success",
        error: 200,
        message: "L'utilisateur a bien été créé"
    });    
})

module.exports = router;