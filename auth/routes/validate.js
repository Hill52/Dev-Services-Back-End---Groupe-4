const express = require("express");
const router = express.Router();

var jwt = require('jsonwebtoken');

const db = require("../validator/validator.js");

router.use(express.json());

router.get("/validate", async (req, res, next) => {
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

        res.status(200).json({
            type: "success",
            code: 200,
            data: token
        });
    } catch (err) {
        console.log(err);
    }
});