
// Product Model Definition
// Divya Basir
// September 16, 2021

const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

mongoose.Promise = require("bluebird");

// user model
const ProductListSchema = new Schema ({
    "productURLs": String,
        "productName":String,
        "brandName":String,
        "productPrice":Number
});

module.exports = mongoose.model("productList", ProductListSchema);