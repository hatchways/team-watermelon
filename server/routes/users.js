const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const verifyToken = require('../middleware/verify.js');

router.get('/allUsers', async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (err) {
		console.error('	');
		res.status(500);
	}
});

router.post('/follow/:id', verifyToken, async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.id);
		const userToFollow = await User.findById(req.params.id);
		if (currentUser.friends_list.includes(userToFollow.id)) {
			res.status(400).send('You allready follow this user');
		} else {
			currentUser.friends_list.push(userToFollow.id);
		}
		await currentUser.save();
		res.send(currentUser.friends_list);
	} catch (err) {
		console.error('Following Error');
		res.status(500);
	}
});

router.post('/unfollow/:id', verifyToken, async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.id);
		const userToUnfollow = await User.findById(req.params.id);

		if (!currentUser.friends_list.includes(userToUnfollow.id)) {
			res.status(400).send("You don't follow this user");
		} else {
			const removeIndex = currentUser.friends_list.indexOf(userToUnfollow.id);
			currentUser.friends_list.splice(removeIndex, 1);
			await currentUser.save();
			res.send(currentUser.friends_list);
		}
	} catch (err) {
		console.error('Unfollowing Error');
		res.status(500);
	}
});

router.post('/updateProfilePicture', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		user.profile_picture = req.body.url;
		await user.save();
		res.status(200).send(user);
	} catch (err) {
		console.error('	');
		res.status(500);
	}
});

router.get('/:id', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).send(user);
	} catch (err) {
		console.error('User not found');
		res.status(500);
	}
});

router.put('/:id/edit', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		user.name = req.body.name;
		user.password = req.body.password;
		await user.save();
		// send email to user - password changed with timestamp
		res.status(200).send(user);
	} catch (err) {
		console.error('	');
		res.status(500);
	}
});
module.exports = router;
