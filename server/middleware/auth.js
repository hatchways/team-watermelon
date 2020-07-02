const jwt = require('jsonwebtoken');

module.exports = authMiddleware = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res.status(403).send('Missing Token');
	}
	//Verify token
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(403).send('token is not valid');
	}
};
