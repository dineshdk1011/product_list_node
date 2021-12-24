const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv").config()
const port = 1000 || process.env.PORT
var app = express()
const cors = require("cors")
var path = require('path');
const mongoDB = require("./database/mongodb")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, 'views')));

app.use("/product", require("./router/product"))

app.listen(port, () => { console.log(`App Running on http://localhost:${port}`) })
