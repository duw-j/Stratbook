require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: process.env.PASSWORD,
  port: 5432,
})

const getStrats = (reqest, response) => {
    pool.query('SELECT * FROM strat ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
};

module.exports = {
    getStrats
};