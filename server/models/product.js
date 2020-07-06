const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String,
    lastprice: mongoose.Types.Decimal128,
    currentprice: mongoose.Types.Decimal128
});
module.exports = mongoose.model("Product", productSchema);