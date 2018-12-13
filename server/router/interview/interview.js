const express = require('express');
const router = express.Router();
const interviewModel = require('../../models/interview/interview');

router.route('/interviews')
	.get((req, res) => {
		let department = req.query.department;
		let status = req.query.status;
		if(req.query.department){//返回该部门的面试者
			if(!status){
				 let search = {
				  	department: department 
				 };
					execFind(interviewModel, search, req, res);
					return;
			}else{
					let search = null;
					if(status === 'interviewing'){
						search = {
							department: department,
							end: false
						}
					}else if(status === 'interviewEnd'){
						search = {
							department: department,
							end: true
						}
					}
					execFind(interviewModel, search, req, res);
					return;
			}
		}
		//返回所有的求职者信息
		execFind(interviewModel, null, req, res);
	})
	.post((req, res) => {//创建求职者信息
			let seeker = req.body;
			let search = {
				name: req.body.name,
				department: req.body.department,//部门
				phone: req.body.phone
			};		
			execCreate(interviewModel, search, seeker, req, res);		
	});

/*查看具体某位该面试者的信息*/
router.route('/interviews/:id')
			.get((req, res) => {
				let id = req.params.id;
				execFindId(interviewModel, id, req, res);
			})
			.put((req, res) => {
				let id = req.params.id;
				let update = req.body;
				execUpdate(interviewModel, id, update, req, res);
			});

/*按照搜索条件查找面试者*/
const execFind = (model, search, req, res) => {
	if(search){
		model.find(search).sort('-createdAt').exec((err, docs) => {
				if(err){
					console.log(err);
						res.status(500).send({
						"Internal Server Error": {
							"code": "500",
							"message": "Internal server error, can't get interviews"
						}
					});
				}else{
					res.status(200).json({
						interviews: docs
					});
				}
			});
	}else{
		model.find().sort('-updatedAt').exec((err, docs) => {
				if(err){
					res.status(500).send({
						"Internal Server Error": {
							"code": "500",
							"message": "Internal server error, can't get interviews"
						}
					});
				}else{
					res.status(200).json({
						interviews: docs
					});
				}
			});
	}
};

/*按照ID查找*/
const execFindId = (model, id, req, res) => {
	model.findById(id).exec((err, doc) => {
		if(err){
					res.status(500).send({
						"Internal Server Error": {
							"code": "500",
							"message": "Internal server error, can't get interview information"
						}
					});
				}else{
					res.status(200).json({
						interview: doc
					});
				}
	});
};

/*按照ID查找并且更新*/
const execUpdate = (model, id, update, req, res) => {
	model.findByIdAndUpdate(id, update).exec((err, doc) => {
		if(err){
			res.status(500).send({
				"Internal Server Error": {
					"code": "500",
					"message": "Internal server error, can't update interview information"
				}
			});
		}else{
			res.status(200).json({
				interview: doc
			});
		}
	});
};


/*创建面试者信息*/
const execCreate = (model, search, seeker, req, res) => {
	model.find(search).exec((err, docs) => {
				if(err){
					res.status(500).send({
						"Internal Server Error": {
							"code": "500",
							"message": "Internal server error, can't get interviews"
						}
					});
				}else{
					if(docs.length === 0){
							model.create(seeker, (err, docs) => {
								if(err){
									console.log(err);
									res.status(500).send({
									"Internal Server Error": {
										"code": "500",
										"message": "Internal server error, create interview fail"
									}
								});
							}else{
								  res.status(200).send({
								  	"Create Succeed": {
								  		"code": "200",
								  		"message": "Crate interview succeed"
								  	}
								  })
							}			
						})
					}else{
						res.status(500).send({
									"Conflit": {
										"code": "500",
										"message": "Interview has already created"
									}
						});
					}
				}
			});
}


module.exports = router;
