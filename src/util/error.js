const errors = {
	user: [
		{
			key: "Bad Request",
			code: 400,
			message: "Authorized error, please try later",
			translate: "鉴权失败，请稍后再试"
		},
		{
			key: "Unauthorized",
			code: 401,
			message: "Invalid username or password",
			translate: "用户名或密码错误"
		},
		{
			key: "error",
			code: 401,
			message: "Change password fail, unknown reason",
			translate: "修改密码错误，请稍后再试"
		}
	],
	interview: [
	{
			key: "Internal Server Error",
			code: 500,
			message: "Internal server error, can't get interviews",
			translate: "服务器异常，请稍后再试"
	},
	{
			key: "Internal Server Error",
			code: 500,
			message: "Internal server error, can't get interview information",
			translate: "服务器异常，获取信息失败"
	},
	{
			key: "Internal Server Error",
			code: 500,
			message: "Internal server error, create interview fail",
			translate: "服务器异常，录入失败"
	},
	{
			key: "Conflit",
			code: 500,
			message: "Interview has already created",
			translate: "录入失败，该应聘者已存在"
	},
	{
			key: "Internal Server Error",
			code: 500,
			message: "Internal server error, can't update interview information",
			translate: "服务器异常，更新信息失败"
	},
	{
		key: "Upload Error",
		code: 500,
		message: "Upload file error, please try again",
		translate: "上传文件失败，请稍后再试"
	},
	{
		key: "Resume Not Found",
		code: 404,
		message: 'Resume not found on server',
		translate: "服务器上并没有该简历"
	}
	]
};

const getErrMessage = (module, data) => {
	var errs = errors[module];
	var key = '';
	for(var key1 in data){
		key = key1;
	};
	var config = data[key];
	var translate = '操作失败，请稍后重试';
	for(let i = 0; i < errs.length; i++){
		if(errs[i].key === key && config.code == errs[i].code){
			if(errs[i].message === config.message){
				translate = errs[i].translate;
			}
		}
	}
	return translate;
}

export default getErrMessage;
