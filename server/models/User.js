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
	my_lists: {
		type: ObjectID
	},
	friends_list: {
		type: ObjectID
	}
});

module.exports = User = mongoose.model('users', UserSchema);
