const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const verifyToken = async (req, res, next) => {
	const token = req.cookies.token;
	try {
		if (!token) {
			return res.status(401).json('You need to Login');
		}
		const decrypt = await jwt.verify(token, process.env.MY_SECRET);
		req.user = {
			id: decrypt.payload
		};
		next();
	} catch (err) {
		return res.status(500).send('Error');
	}
};

module.exports = verifyToken;
