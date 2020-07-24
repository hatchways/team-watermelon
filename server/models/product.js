const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    url: String,
    lastprice: mongoose.Types.Decimal128,
    currentprice: mongoose.Types.Decimal128,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
module.exports = mongoose.model("Product", productSchema);