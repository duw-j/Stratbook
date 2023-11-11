require('dotenv').config();
const dbconfig = require('../../config/dbconfig')

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: process.env.PASSWORD,
//   port: 5432,
// })

const pool = dbconfig.pool;

const getStrats = (req, res) => {
    pool.query('SELECT * FROM strat ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error;
        }
        //response.status(200).json(results.rows);
        res.render("../views/strat/allstrat.pug", {strats: results.rows})
    })
};

const getStratByID = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("SELECT p.name AS pname, s.name AS sname, role FROM player as p, strat as s, StratPlayer as sp WHERE sid = s.id AND pid = p.id AND sp.sid = $1;", [id], (error, results) => {
        if(error) {
            throw error;
        }
        //response.status(200).json(results.rows);
        console.log(results.rows);
        if(results.rows.length == 0) {
            console.log("no res");
        } else {
            res.render('../views/strat/strat.pug', {strat : results.rows})
        }
    })
};

const createStrat = (request, response) => {
    const name = request.body.stratName;
    console.log(name);

    pool.query("INSERT INTO strat (name) VALUES ($1)", [name], (error, results) => {
        if(error) {
            throw error;
        }
        //response.status(200).send("User added with ID: ${results.insertId}")
        response.redirect("/strat")
    })
}

const deleteStrat = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query("DELETE FROM strat WHERE ID = $1", [id], (error, results) => {
        if(error) {
            throw error;
        }
        response.redirect('/strat')
    })
}

module.exports = {
    getStrats,
    getStratByID,
    createStrat,
    deleteStrat
};