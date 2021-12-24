const mongoose = require("mongoose")
const Sechma = mongoose.Schema
const mongoDB = require("../database/mongodb")

const productSechma = new Sechma({
    picture: {
        type: String,
        required: true
    },
    productid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
})

const products = mongoose.model("product", productSechma)
module.exports = products