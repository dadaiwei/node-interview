const interview = {};

/*获取所有面试者信息*/
interview.getInterviews = (cancelToken) => {
	return axios.get('/interviews', {
		cancelToken
	}).then(res => res.data);
}

/*录入面试者信息*/
interview.createInter = (data, cancelToken) => {
	return axios.post('/interviews', data, {
		cancelToken
	}).then(res => res.data);
}

/*获取当前部门的面试者信息*/
interview.getDepInter = (department, cancelToken) => {
	return axios.get(`/interviews?department=${department}`, {
		cancelToken
	}).then(res => res.data);
}

/*获取当前部门中正在面试者的信息*/
interview.getDepInterviewIng = (department, cancelToken) => {
	return axios.get(`/interviews?department=${department}&status=interviewing`, {
		cancelToken
	}).then(res => res.data);
}

/*获取当前部门中面试结束的信息*/
interview.getDepInterviewEnd = (department, cancelToken) => {
	return axios.get(`/interviews?department=${department}&status=interviewEnd`, {
		cancelToken
	}).then(res => res.data);
}

/*更新面试者信息*/
interview.updateInterview = (id, data, cancelToken) => {
	return axios.put(`/interviews/${id}`, data, {cancelToken}).then(res => res.data);
}

/*获取当前面试者的信息*/
interview.getInterDetail = (id, cancelToken) => {
	return axios.get(`/interviews/${id}`, {
		cancelToken
	}).then(res => res.data);
}

/*推荐到其他部门*/
interview.recommend = (id, data, cancelToken) => {
	return axios.put(`/interviews/${id}`, data, {cancelToken}).then(res => res.data);
}

/*上传文件*/
interview.upload = (cancelToken) => {
	return axios.post('/upload', {
		cancelToken
	}).then(res => res.data);
}

export default interview;