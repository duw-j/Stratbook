const express = require('express')
const router = express.Router();

const db = require("../../database/strat/StratQueries")

// router.post("/", db.createStrat);
router.get("/", db.getStrats);

// router.get('/add', (req, res) => {
//     res.render("../views/strat/add.pug");
// });

// router.get("/add", (req, res) => {

// });

router.get("/new", (req, res) => {
    res.render("../views/strat/new.pug");
});

router.post("/create", db.createStrat);
router.post("/delete/:id", db.deleteStrat);
router.get("/:id", db.getStratByID);



module.exports = router;