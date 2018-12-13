const user = {};

/*用户登录验证*/
user.login = (data, cancelToken) => {
	return axios.post('/user', data, {cancelToken}).then(res => res.data);
}
/*验证用户名及密码*/
user.changePwd = (data, cancelToken) => {
	return axios.put('/user', data, {cancelToken}).then(res => res.data);
}

export default user;