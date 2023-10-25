const express = require('express')
const router = express.Router();

const db = require("../database/queries")

router.get("/", db.getStrats);

router.get('/new', (req, res) => {
    res.send('Now on test page :D ')
});

module.exports = router;