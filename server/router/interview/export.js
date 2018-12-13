const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

router.route('/exports')
			.get((req, res) => {
				
			})

/*写入excel*/
const writeExcel = (result) => {
	
}

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