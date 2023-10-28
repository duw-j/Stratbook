const dbconfig = require('../config/dbconfig')

const pool = dbconfig.pool;

const getPlayers = (req, res) => {
    pool.query('SELECT * FROM player ORDER\ BY id ASC', (error, results) => {
        if(error) {
            throw error;
        }
        res.render('../views/player/player.pug', {players: results.rows})
    })
};

module.exports = {
    getPlayers
};
