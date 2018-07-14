var xlsx = require('node-xlsx');
var fs = require('fs');
//读取文件内容
var obj = xlsx.parse('./存储事业部-招聘面试情况记录表.xlsx');
var data = obj[0].data;

console.log(data[0]);
console.log(data[0][11]);
