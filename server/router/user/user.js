const express = require('express');
const router = express.Router();
const userModel = require('../../models/user/user');

router.route('/user')
	.post((req, res) => {
		let name = req.body.name;
		let password = req.body.password;
		let search = {
			name,
			password
		};
		userModel.find(search, (err, docs) => {
			if(err){
				res.status(400).json({
					"Bad Request": {
						"code": "400",
						"message": "Authorized error, please try later"
					}
				});
			}else{
				if(docs.length === 0){
					res.status(401).json({
						"Unauthorized":{
							"code": "401",
							"message": "Invalid username or password"
						}
					});
				}else{
					res.status(200).json({
						"role": docs[0].role
					});
				}
			}
		})
	})
	.put((req, res) => {
		let search = {
			name: req.body.name
		};
		let newPwd = {
			password: req.body["new-password"]
		};
		
		userModel.update(search, newPwd, (err, raw) => {
			if(err){
				res.status(401).json({
						"error":{
							"code": "401",
							"message": "Change password fail, unknown reason"
						}
					});
			}else{
				res.status(200).json({
					"Update Succeed":{
							"code": "200",
							"message": "Update the password succeed"
						}
				});
			}
		})
	})

module.exports = router;
