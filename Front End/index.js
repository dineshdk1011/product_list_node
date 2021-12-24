const express = require("express")
const morgan = require("morgan")
const port = 1001 
var app = express()
var path = require('path');

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function (req, res) {
    res.render(__dirname + '/views/index.html');
});

app.listen(port, () => { console.log(`App Running on http://localhost:${port}`) })
