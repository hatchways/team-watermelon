const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String,
    lastprice: mongoose.Types.Decimal128,
    currentprice: mongoose.Types.Decimal128,
    list: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
      }
    }
});
module.exports = mongoose.model("Product", productSchema);