const jwt = require('jsonwebtoken');

const generateToken = (res, payload) => {
	const token = jwt.sign(payload, process.env.SECRET_KEY, {
		expiresIn: 960000
	});
	return res.cookie('token', token, {
		expires: new Date(Date.now() + 960000),
		secure: false, // set to true if your using https
		httpOnly: true
	});
};
module.exports = generateToken;
