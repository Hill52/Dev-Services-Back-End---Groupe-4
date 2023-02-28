const express = require('express');
const router = express.Router();

const db = require("../db_connection");

router.get('/', async (req, res, next) => {
    try {
        const users = await db('users');
        res.json({ data: users });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;