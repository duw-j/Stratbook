const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
