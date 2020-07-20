const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    noti_type: {
        type: String,
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true
    },
    content:{
        title: String, 
        image: String, 
        description: String,
        url: String,
        isRead: {
            type: Boolean,
            default: false
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        lastprice: mongoose.Types.Decimal128,
        currentprice: mongoose.Types.Decimal128,
        follower_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
        }
    },
    isEmitted:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("Notification", notificationSchema);