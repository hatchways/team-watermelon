const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
	title: String,
	image: String,
	subtitle: String,
	created: {
		type: Date,
		default: Date.now
	},
	/*user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},*/
	products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
});
module.exports = mongoose.model("List", listSchema);