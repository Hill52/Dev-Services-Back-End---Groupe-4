const jwt_decode = require('jwt-decode');

const express = require("express");
const router = express.Router();

var jwt = require('jsonwebtoken');

const db = require("../db/client.js");

router.use(express.json());

router.get("/", async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token == null) {
            res.status(401).json({
                type: "error",
                error: 401,
                message: "Header absent"
            });
        return
        }

        let tokenexp = token.split(' ')[1];

        if (tokenexp < Date.now()) {
            res.status(401).json({
                type: "error",
                error: 401,
                message: "Token expiré"
            });
        return
        }

        let tokenid = jwt_decode(token).id;
        //Si le token est valide, un code 200 est retourné, accompagné du profil de l'utilisateur authentifié (email, username, level).

        let user = await db.getUser(tokenid);
        console.log(user);
        if (user.rowCount == 0) {
            res.status(401).json({
                type: "error",
                error: 401,
                message: "Utilisateur non trouvé"
            });
        return
        }

        res.status(200).json({
            type: "success",
            code: 200,
            
            data: user
        });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;
