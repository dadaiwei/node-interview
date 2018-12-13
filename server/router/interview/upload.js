const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../upload/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

var createFolder = (folder) => {
	try {
		fs.accessSync(folder);
	} catch(e) {
		fs.mkdirSync(folder);
	}
};

var uploadFolder = '../upload/';
createFolder(uploadFolder);

var upload = multer({
	storage
}).single('file');

router.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if(err) {
			console.log(err);
			res.status(500).json({
				"Upload Error": {
					"code": "500",
					"message": "Upload file error, please try again"
				}
			})
		} else {
			res.status(200).json({
				"Upload Succeed": {
					"code": "200",
					"message": "Upload file succeed"
				}
			})
		}
	})
});

module.exports = router;