const express = require('express');
const router = express.Router();

const upload = require('../utils/fileUpload.js');

const singleUpload = upload.single('image');

router.post('/image-upload', async function (req, res) {
	singleUpload(req, res, function (error) {
		return res.json({ imageUrl: req.file.location });
	});
});

module.exports = router;
