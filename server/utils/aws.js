const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;
aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

AWS.config.getCredentials(function (err) {
	if (err) console.log(err.stack);
	// credentials not loaded
	else {
		console.log('Access key:', AWS.config.credentials.accessKeyId);
	}
});

//configuring the AWS environment
// AWS.config.update({
// 	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// 	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// var s3 = new AWS.S3();
// var filePath = './file.txt';

// //configuring parameters
// var params = {
// 	Bucket: 'team-watermelon-bigdeal-images',
// 	Body: fs.createReadStream(filePath),
// 	Key: 'folder/' + Date.now() + '_' + path.basename(filePath)
// };

// s3.upload(params, function (err, data) {
// 	//handle error
// 	if (err) {
// 		console.log('Error', err);
// 	}

// 	//success
// 	if (data) {
// 		console.log('Uploaded in:', data.Location);
// 	}
// });
