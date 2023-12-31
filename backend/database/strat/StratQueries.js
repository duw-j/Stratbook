require("dotenv").config();
const dbconfig = require("../../config/dbconfig");

const pool = dbconfig.pool;

let insertedID;

const getStrats = (req, res) => {
	// pool.query('SELECT * FROM strat ORDER BY id ASC', (error, results) => {
	pool.query(
		'SELECT strat.id as "id", strat.name as "name", map.name as "map" from strat, map WHERE strat.map = map.id;',
		(error, results) => {
			if (error) {
				throw error;
			}
			//response.status(200).json(results.rows);
			res.render("../views/strat/allstrat.pug", { strats: results.rows });
		}
	);
};

const getStratsByMap = (req, res) => {
	const map = parseInt(req.params.id);
	const query = {
		// text: `SELECT strat.id as "id", strat.name as "name", map.name as "map" from strat, map WHERE strat.map = map.id AND map.id = $1;`,
		text: `SELECT player.id as pid, player.name AS pname, strat.id as sid, strat.name as sname, role, map.name as map
		FROM player, strat, map, stratplayer 
		WHERE sid = strat.id
		AND pid = player.id
		AND strat.map = map.id
		AND map.id = $1`,
		values: [map],
	};

	pool
		.query(query)
		.then((results) => {
			console.log(results.rows);
			res.json({ result: results.rows });
		})
		.catch((error) => {
			console.error("Error in getStratByID: " + error);
			res.status(500).json({ error: "Internal Server Error" });
		});
};

const getStratByID = (req, res) => {
	const id = parseInt(req.params.id);
	const query = {
		text: "SELECT p.name AS pname, s.name AS sname, role FROM player as p, strat as s, StratPlayer as sp WHERE sid = s.id AND pid = p.id AND sp.sid = $1;",
		values: [id],
	};

	pool
		.query(query)
		.then((results) => {
			console.log(results.rows);
			res.json({ result: results.rows });
		})
		.catch((error) => {
			console.error("Error in getStratByID: " + error);
			res.status(500).json({ error: "Internal Server Error" });
		});

	// pool.query(
	// 	"SELECT p.name AS pname, s.name AS sname, role FROM player as p, strat as s, StratPlayer as sp WHERE sid = s.id AND pid = p.id AND sp.sid = $1;",
	// 	[id],
	// 	(error, results) => {
	// 		if (error) {
	// 			throw error;
	// 		}
	// 		return res.json({ result: results.rows });
	// 		//response.status(200).json(results.rows);
	// 		// console.log(results.rows);
	// 		// if (results.rows.length == 0) {
	// 		// 	console.log("no res");
	// 		// } else {
	// 		// 	res.render("../views/strat/strat.pug", { strat: results.rows });
	// 		// }
	// 	}
	// );
};

const newStrat = (request, response) => {
	pool.query("SELECT name FROM player;", (error, results) => {
		if (error) {
			throw error;
		}
		response.render("../views/strat/new.pug", { players: results.rows });
	});
};

const createStrat = (request, response) => {
	const name = request.body.stratName;

	pool.query(
		"INSERT INTO strat (name) VALUES ($1) RETURNING id",
		[name],
		(error, results) => {
			if (error) {
				throw error;
			}
			//response.status(200).send("User added with ID: ${results.insertId}")
			insertedID = results.rows[0].id;
			response.redirect("/strat/addrole");
		}
	);
};

const addRole = (req, response) => {
	pool.query("SELECT * FROM player", (err, res) => {
		if (err) {
			throw err;
		}
		response.render("../views/strat/addrole.pug", { players: res.rows });
	});
};

const addStratPlayer = (req, res) => {
	const playerIDs = req.body.playerId;
	const roles = req.body.playerRole;

	const values = [
		[parseInt(playerIDs[0]), insertedID, roles[0]],
		[parseInt(playerIDs[1]), insertedID, roles[1]],
		[parseInt(playerIDs[2]), insertedID, roles[2]],
		[parseInt(playerIDs[3]), insertedID, roles[3]],
		[parseInt(playerIDs[4]), insertedID, roles[4]],
	];

	const query = {
		text: "INSERT INTO stratplayer (pid, sid, role) VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12), ($13, $14, $15)",
		values: values.flat(),
	};

	pool.query(query, (err, result) => {
		if (err) {
			throw err;
		}

		console.log("Inserted rows: ", result.rowCount);
		res.redirect("/strat/" + insertedID); // Redirect to the desired location after insertion
	});
};

const deleteStrat = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query("DELETE FROM strat WHERE ID = $1", [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.redirect("/strat");
	});
};

module.exports = {
	getStrats,
	getStratsByMap,
	addRole,
	getStratByID,
	newStrat,
	createStrat,
	addStratPlayer,
	deleteStrat,
};
