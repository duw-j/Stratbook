const express = require("express");
const router = express.Router();

const db = require("../../database/strat/StratQueries");

// router.post("/", db.createStrat);
router.get("/", db.getStrats);

// router.get('/add', (req, res) => {
//     res.render("../views/strat/add.pug");
// });

// router.get("/add", (req, res) => {

// });

// router.get("/new", (req, res) => {
// res.render("../views/strat/new.pug");
// });

router.get("/new", db.newStrat);

router.post("/create", db.createStrat);

router.get("/addrole", db.addRole);

router.post("/addstratplayer", db.addStratPlayer);

router.get("/map/:id", db.getStratsByMap);

router.get("/:id", db.getStratByID);

router.post("/delete/:id", db.deleteStrat);

module.exports = router;
