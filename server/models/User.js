const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	my_lists: {
		type: Array
	},
	friends_list: {
		type: Array
	}
});

module.exports = User = mongoose.model('users', UserSchema);
