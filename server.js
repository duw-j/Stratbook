const express = require('express')
const stratRoute = require('./routes/strat')
const playerRoute = require('./routes/player')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "pug");

app.use('/strat', stratRoute);
app.use('/player', playerRoute)

app.get('/', function (req, res) {
    res.send('GET request to homepage')
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 