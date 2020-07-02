const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.js');
const User = require('../models/User.js');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');
const verifyToken = require('../middleware/verify.js');

// @route    POST api/registerUser
// @desc     Register user
// @access   Public

router.post(
	'/register',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { password, email } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
			}
			user = new User({
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			const payload = {
				user: {
					id: user.id
				}
			};

			await generateToken(res, payload);
			res.status(200).send(user);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);
// @route    POST /auth/login
// @desc     Login user
// @access   Public

router.post(
	'/login',
	[check('email', 'Please enter a valid email').isEmail(), check('password', 'Password is required').exists()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Password' }] });
			}
			const payload = {
				user: {
					id: user.id
				}
			};

			await generateToken(res, payload);
			res.status(200).send(user);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('server error');
		}
	}
);

//// @route    GET api/auth
// @desc     Get user by token
// @access   Private

router.get('/', authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.send(user);
	} catch (err) {
		console.error('	');
		res.status(500);
	}
});

router.post('/verify', verifyToken, async (req, res) => {
	try {
		res.status(200).send('Cookie token verified');
	} catch (err) {
		console.error(err.message);
		res.status(500);
	}
});

router.post('/logout', function (req, res) {
	const token = req.cookies.token;
	if (!token) {
		return res.status(403).send('You are not logged in.');
	}
	res.clearCookie('token');
	res.status(200).send('Successfully Logged Out');
});
module.exports = router;
