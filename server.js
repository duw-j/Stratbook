const express = require('express')
const stratRoute = require('./routes/strat/strat')
const playerRoute = require('./routes/player/player')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "pug");

app.use('/strat', stratRoute);
app.use('/player', playerRoute)

app.get('/', function (req, res) {
    res.render('index')
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 