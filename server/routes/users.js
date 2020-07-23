const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const List = require('../models/List');
const verifyToken = require('../middleware/verify.js');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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

router.get('/:name', async function (req, res) {
	try {
		const user = await User.find({ name: req.params.name }).populate("my_lists").exec();
		res.status(200).send(user);
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

router.get('/:name/productslist/:id', async function (req, res) {
	try {
		const products =  await List.findById(req.params.id).populate("products").exec();
		res.status(200).send(products);
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

/*router.get('/:id', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).send(user);
	} catch (err) {
		console.error('User not found');
		res.status(500);
	}
});*/

router.put('/:id/edit',
[
	check('name', 'Name is required').not().isEmpty(),
	check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
verifyToken, 
async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { name, password, email } = req.body;
	try {
		let checkUser = await User.findOne({ name });
		if (checkUser) {
			return res.status(400).json({ errors: [{ msg: 'Username already exists.' }] });
		}
		let user = await User.findOne({ email });
		user.name = name;
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
		res.status(200).send(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
