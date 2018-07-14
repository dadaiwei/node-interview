let interview = require('./models/interview/interview.js');

var xlsx = require('node-xlsx');
var fs = require('fs');
//读取文件内容
var obj = xlsx.parse('./存储事业部-招聘面试情况记录表.xlsx');
var data = obj[0].data;

for(let i = 0 ; i < data.length; i++){
	let config = {
		name: data[i][4],//名称
		department: data[i][1],//部门
		phone: data[i][5],//电话
		channel: data[i][2],//招聘渠道
	 	station: String,//岗位
	 	sex: String,//性别
	 	presentCompany: String, //现所在公司
	 	school: String, //学校
	 	graduateTime: Date,//毕业时间
	 	telephoneInterview:{//电话面试
	 		time: Date,//时间
	 		interviewer: String,//面试人
	 		result: String //面试结果
	 	},
    recommended: String,//是否推荐给其他组
    onSiteInterview: {
    	time: Date,//时间
    	oneSideResult: String,//一面结果,
    	secondSideResult: String,//二面结果
    },
    interviewEvaluate: String,//面试评价
    receiveOffer: String,//应聘者是否接收offer
    end: Boolean,//是否结束面试流程
    reportTime: Date,//拟报到时间
    remark: String,//备注,
    resume: String//简历地址
	}
}
