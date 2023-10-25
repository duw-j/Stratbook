const express = require('express')
const stratRoute = require('./routes/strat')

const app = express();
const port = 3000;

app.use(express.json());

app.use('/strat', stratRoute);

app.get('/', function (req, res) {
    res.send('GET request to homepage')
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 