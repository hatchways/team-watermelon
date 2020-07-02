const jwt = require('jsonwebtoken');

module.exports = verifyToken = async (req, res, next) => {
	const token = req.cookies.token;
	try {
		if (!token) {
			return res.status(403).json({ msg: ' No token, You need to Login' });
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded.user;
		next();
	} catch (err) {
		return res.status(500);
	}
};
