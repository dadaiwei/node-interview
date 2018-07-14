	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/';
	var xlsx = require('node-xlsx');
	var fs = require('fs');

	var selectData = function(db, callback) {
		var collection = db.collection('interviews');
		collection.find({}).toArray(function(err, result) {
			if(err) {
				console.log('出错：' + err);
				return;
			}
			callback(result);
		});
	}

	//格式化时间函数
	var formatDate = function(date, style) {
		var y = date.getFullYear();
		var M = "0" + (date.getMonth() + 1);
		M = M.substring(M.length - 2);
		var d = "0" + date.getDate();
		d = d.substring(d.length - 2);
		var h = "0" + date.getHours();
		h = h.substring(h.length - 2);
		var m = "0" + date.getMinutes();
		m = m.substring(m.length - 2);
		var s = "0" + date.getSeconds();
		s = s.substring(s.length - 2);
		return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s);
	}

	// 读取并写入excel文件
	MongoClient.connect(DB_CONN_STR, function(err, db) {
		console.log('连接成功');
		let dbo = db.db('interview');
		selectData(dbo, function(result) {
			console.log(result);
			var data_content = [
				['姓名', '部门', '岗位', '联系方式', '学校', '电话面试', '现场面试', ['一面结果', '二面结果'], '接收offer']
			]; //JSON数组，第一行是Excel表头
			for(var i = 0; i < result.length; i++) {
				var arry = [result[i].name, result[i].department, result[i].station,
					result[i].phone, '"' + result[i].school + '"', result[i].telInterResult
				];
				data_content.push(arry);
			};

			db.close(); // 关闭数据库连接

			var file = xlsx.build([{
				name: '应聘者信息',
				data: data_content
			}]); //构建xlsx对象
			fs.writeFileSync('e:/interview.xlsx', file, 'binary'); // 写入
			console.log('写入完成');
		});
	});