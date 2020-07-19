const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    noti_type: {
        type: String,
        required: true
    },
	title: String,
	image: String,
    description: String,
    url: String,
    isRead: {
        type: Boolean,
        default: false
    },
	user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
	},
	product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    list:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Notification", notificationSchema);