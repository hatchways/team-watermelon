const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profile_picture: {
		type: String,
		default: 'https://team-watermelon-bigdeal-images.s3.amazonaws.com/1594759929818'
	},
	my_lists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'List'
		}
	],
	friends_list: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

module.exports = User = mongoose.model('users', UserSchema);
