const global = {
	deepClone(srcObj){
		let type = Object.prototype.toString.call(srcObj);
		let result = null;
		if((type === "[object Object]") || (type === "[object Array]")){
			result = JSON.parse(JSON.stringify(srcObj));
		}
		return result;
	},
	changeUTCTime(utcTime){
		if(null === utcTime){
			return '';
		}
		if(undefined === utcTime){
			return '';
		}
		if(utcTime === ''){
			return '';
		}
		var date = new Date(`${utcTime.substr(0, 19)}Z`);
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	},
	searchContents(contents, searchCondition, searchValue){
		let result = [];
		result = contents.filter(item => {
			return item[searchCondition].indexOf(searchValue) !== -1;
		});
		return result;
	}
};

export default global;
