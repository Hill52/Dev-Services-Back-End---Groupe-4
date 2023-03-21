const express = require("express");
const router = express.Router();

const dbItem = require("../db/item.js");
const validator = require("../validator/validator.js");

router.use(express.json());

router.get("/", async (req, res) => {
    try {
        let response = await dbItem.getItems();
        if (response.length == 0) {
            res.status(404).json({
                type: "error",
                error: 404,
                message: "ressource non disponible : /items/",
            });
        } else {
            let itemsSend = {
                type: "collection",
                items: response,
            };
            res.json(itemsSend);
        }    
    } catch (err) {
        console.log(err);
    }
    });

module.exports = router;