const fs = require('fs');

const path = require('path');

var xlsx = require('node-xlsx');

const filePath = './面试简历库';

const xlsxFile = './存储事业部-招聘面试情况记录表.xlsx';

var files = [];

fileDisplay(filePath);

function fileDisplay(filePath){
	fs.readdir(filePath, (err, files) => {
		if(err){
			console.log(err);
		}else{
			let data = xlsx.parse(xlsxFile)[0].data;
			for(let i = 2; i < data.length; i++){
				for(let j = 0; j < files.length; j++){
					if(files[j].indexOf(data[i][4]) !== -1){
						data[i][21] = files[j];
						break;
					}
				}
			}
			
	
			var buffer = xlsx.build([{name: '社招', data}])
			fs.writeFileSync(`./${xlsxFile}`, buffer);
			console.log('文件写入成功');
		}
	})
}
