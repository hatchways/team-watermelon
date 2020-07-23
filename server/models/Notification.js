const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
	{
		notificationType: {
			type: String,
			required: true
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		content: {
			title: String,
			image: String,
			description: String,
			url: String,
			isRead: {
				type: Boolean,
				default: false
			},
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			},
			lastprice: mongoose.Types.Decimal128,
			currentprice: mongoose.Types.Decimal128,
			followerId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		},
		isEmitted: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Notification', notificationSchema);
