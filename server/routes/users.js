const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/allUsers', async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (err) {
		console.error('	');
		res.status(500);
	}
});

module.exports = router;
