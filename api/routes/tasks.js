const express = require('express');
const router = express.Router();
const db = require("../db_connection");

// Autorise le json dans le body de la requête
router.use(express.json());

router.get('/', async (req, res, next) => {
    try {
        const tasks = await db('item');
        res.json({ data: tasks });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const task = await db('item').insert(req.body);
        res.json({ data: task });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;