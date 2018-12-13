const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: String,//用户名
		password: String,//密码,
		role: String//角色
	}, 
	{
		timestamps: true
	});

const user = mongoose.model('user', userSchema);

module.exports = user;


