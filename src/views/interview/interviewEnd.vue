<template>
	<div>
		<view-header :title="title"></view-header>
		<div class="el-card content-table" v-loading="loading" element-loading-text="加载中">
			<operation-search ref="operationSearch" 
				module="interviewEnd"
				@button-operation="operation"
				@search-contents="searchContents">
			</operation-search>
			<div style="margin-top:20px; padding:0 20px;">
				<el-table ref="contentsTable" :data="contents" tooltip-effect="dark" style="width:100%;" @selection-change="handleSelectionChange" max-height="350">
					<el-table-column type="selection" width="50"></el-table-column>
					<el-table-column v-for="h in headers" :key="h.field" :label="h.name" show-overflow-tooltip align="center">
						<template slot-scope="scope">
							<span>{{scope.row[h.field]}}</span>
						</template>
						<el-table-column v-for="h1 in h.children" :key="h1.field" :label="h1.name" show-overflow-tooltip align="center">
							<template slot-scope="scope1">
								<span>{{scope1.row[h1.field]}}</span>
							</template>
						</el-table-column>
					</el-table-column>
					<el-table-column fixed="right" label="操作" align="center">
						<template slot-scope="scope">
								<el-button type="text" size="small" @click="check(scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="padding: 20px 30px;">
				<el-pagination
					layout="total, sizes, prev, pager, next, jumper"
					background
					:page-sizes="pageSizes"
					:page-size="pageSize"
					:total="total"
					:current-page="currentPage"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
		<transition name="fade">
			<div v-if="visible">
					<interview-detail :id="id" @close="visible = false"></interview-detail>
			</div>
		</transition>
		<el-dialog v-loading="loading1" element-loading-text="加载中" title="推荐给其他组" :visible.sync="visible1" width="400px">
			<div style="height: 120px;padding: 0px 20px;">
					<label style="margin-right: 20px;">组名</label>
					<el-select v-model="selectedDepartment" filterable placeholder="请选择">
					<el-option
						v-for="item in departments"
						:key="item"
						:label="item"
						:value="item">
					</el-option>
				</el-select>
				<p style="color:#F56C6C;padding-left: 70px;margin: 10px 0px -10px 0px;height:20px;line-height: 20px;">{{warningMessage}}</p>
				<div style="margin-top: 20px;padding-left: 150px;">
					<el-button @click="visible1 = false" size="small">取消</el-button>
					<el-button type="primary" size="small" @click="confirmRecommend">确定</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import InterviewDetail from './interviewDetail'
	export default{
		name: 'interviewEnd',
		data(){
			return {
				cancelToken: null,
				loading: false,
				visible: false,
				loading1: false,
				visible1:false,
				departments: [],
				selectedDepartment: '',
				warningMessage: '',
				id: '',
				title: '面试结束',
				headers: [],
				contents: [],
				allContens: [],
				searchedContents: [],
				selectedContents: [],
				pageSizes: [],
				pageSize: 10,
				total: 0,
				currentPage: 1
			}
		},
		methods: {
			operation(args){
				let operation = args.operation;
				switch(operation){
					case "刷新":
						this.getContents();
						break;
					case "推荐":
						let selectedContents = this.selectedContents;
						this.selectedDepartment = '';
						this.warningMessage = '';
						if(selectedContents.length === 0){
							this.$message({
								type: 'warning',
								message: '请选中要推荐的候选人'
							});
							return;
						}else{
							this.visible1 = true;
						}
						break;
				}
			},
			handleSelectionChange(selectedContents){
				this.selectedContents = selectedContents;
			},
			check(c){
				this.id = c.id;
				this.visible = true;
			},
			confirmRecommend(){
				let contents = this.selectedContents;
				let department = this.selectedDepartment;
				if(!department){
					this.warningMessage = '请选择部门';
					return;
				}
				let promises = [];
				this.loading1 = true;
					let update = {
						department: department,
						telephoneInterview: {
							time: null,//时间
					 		interviewer: '',//面试人
					 		result: '' 
						},
						onSiteInterview: {
							time: null,//时间
					 		oneSideResult: '',//一面结果
					 		secondSideResult: ''//二面结果
						},
						end: false
				};
				for(let item of contents){
					promises.push(api.interview.recommend(item.id, update, this.cancelToken));
				}
				Promise.all(promises).then(res => {
					this.loading1 = false;
					this.visible1 = false;
					this.$message({
						type: 'success',
						message: '推荐成功'
					});
					this.getContents();
				}).catch(err => {
					this.loading1 = false;
					this.visible1 = false;
					let errMessage = getErrMessage('interview', err.response.data);
					this.$message({
						type: 'error',
						message: errMessage
					})
				})
			},
			searchContents(args){
				let searchCondition = args.searchCondition,
						searchValue = args.searchValue;
				this.currentPage = 1;
				if(searchValue){
					this.searchedContents = $global.searchContents(this.allContents, searchCondition, searchValue);
					this.total = this.searchedContents.length;
					this.contents = this.searchedContents.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
				}else{
					this.total = this.allContents.length;
					this.searchedContents = this.allContents;
					this.contents = this.allContents.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
				}
			},
			handleSizeChange(pageSize){
				this.pageSize = pageSize;
				this.contents = this.searchedContents.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
			},
			handleCurrentChange(currentPage){
				this.currentPage = currentPage;
				this.contents = this.searchedContents.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);
			},
			getContents(){
				this.$refs.operationSearch.searchValue = '';
				this.loading = true;
				this.contents = [];
				let deparment = sessionStorage.getItem('name');
				api.interview.getDepInterviewEnd(deparment, this.cancelToken).then((result) => {
					this.loading = false;
					this.contents = [];
					let interviews = result.interviews;
					for(let i = 0; i < interviews.length; i++){
						this.contents.push({
							id: interviews[i]._id,
							name: interviews[i].name,
							department: interviews[i].department,
							station: interviews[i].station,
							phone: interviews[i].phone,
							school: interviews[i].school,
							telInterResult:interviews[i].telephoneInterview.result,
							oneSideResult:interviews[i].onSiteInterview.oneSideResult,
							secondSideResult:interviews[i].onSiteInterview.secondSideResult,
							receiveOffer: interviews[i].receiveOffer,
							reportTime: $global.changeUTCTime(interviews[i].reportTime),
							remark: interviews[i].remark
						})
					};
					this.allContents = $global.deepClone(this.contents);
					this.total = this.allContents.length;
					this.searchedContents = this.allContents;
					this.currentPage = 1;
					if(this.total > 0){
						this.contents = this.allContents.slice(this.pageSize * (this.currentPage - 1), this.pageSize * (this.currentPage))
					}
				
				}).catch(err => {
					this.loading = false;
					console.log(err);
					let errMessage = getErrMessage('interview', err.response.data);
					this.$message({
						type: 'error',
						message: errMessage
					})
				});
			},
			init(){
				this.pageSizes = ENV.pageSize;
				this.pageSize = this.pageSizes[0];
				this.headers = tableHeaders.interviewEnd;
				let deparment = sessionStorage.getItem('name');
				this.departments = ENV.departments.filter((item) =>{
						return item !== deparment;
				});
			}
		},
		mounted(){
			this.init();
			this.getContents();
			
			this.cancelToken = new $cancelToken(c => {
				this.cancel = c;
			})
		},	
		components: {
			InterviewDetail
		},
		beforeDestory(){
			this.cancel('取消请求');
		}
	}
</script>

<style scoped>
	.content-table{
		heigth: auto;
		padding: 15px 0px;
	}
	.fade-enter-active, .fade-leave-active{
		transition: opacity 0.2s;
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
</style>