const express = require('express')
const router = express.Router();

const db = require("../../database/player/PlayerQueries")

router.get("/", db.getPlayers);

module.exports = router;