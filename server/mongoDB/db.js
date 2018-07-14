const mongoose = require('mongoose');
const mongodbUrl = 'mongodb://localhost:27017/interview';
const userModel = require('../models/user/user');
const loginUser = require('../config/config');

mongoose.connect(mongodbUrl);
const db = mongoose.connection;
db.once('error', ()=> console.log('数据库连接失败'));
db.on('open', ()=> {
	console.log('数据库连接成功');
	
	for(let i = 0; i < loginUser.length; i++){
		let user = loginUser[i];
		userModel.find(user).exec((err, docs) => {
			if(err){
				console.log(err);
				return;
			}
			if(docs.length === 0){
				userModel.create(user, (err, docs) => {
					if(err){
						console.log(err);
						return;
					}
					console.log('登录账号创建成功');
				})
			}
		});
	}
});



module.exports = db;


