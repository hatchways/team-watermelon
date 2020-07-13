const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({});

AWS.config.getCredentials(function (err) {
	if (err) console.log(err.stack);
	// credentials not loaded
	else {
		console.log('Access key: confirmed');
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
	}
};

const upload = multer({
	fileFilter,
	storage: multerS3({
		s3: s3,
		bucket: 'team-watermelon-bigdeal-images',
		//this is breaking it now
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: 'TESTING_METADATA' });
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString());
		}
	})
});

module.exports = upload;
