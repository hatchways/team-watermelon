const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
	// get token from the header
	console.log(req.cookies.token);
	const token = req.cookies.token;
	//check if there is no token
	if (!token) {
		return res.status(401).json({ msg: 'no token, auth slammed down' });
	}
	//Verify token
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded.user;
		console.log(req.user);
		next();
	} catch (err) {
		res.status(401).json({ msg: 'token is not valid' });
	}
};
