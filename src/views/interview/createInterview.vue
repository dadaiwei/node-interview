<template>
	<el-dialog title="录入应聘者" v-loading="loading" element-loading-text="加载中" :visible.sync="visible" width="70%" @close="closeDialog">
		<div style="height:350px;overflow: auto;">
			<el-form ref="interviewForm" :model="interview" :rules="rules" label-position="right" :inline="true" style="padding-left: 30px;">
				<p class="form-label">基本信息</p>
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名" prop="name">
							<el-input v-model="interview.name" placeholder="请输入姓名" class="form-item"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别" prop="sex">
							<el-radio v-model="interview.sex" label="男" class="form-radio">男</el-radio>
							<el-radio v-model="interview.sex" label="女">女</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="电话" prop="phone">
							<el-input v-model="interview.phone" placeholder="请输入电话" style="width: 218px;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="部门" prop="department">
							<el-select v-model="interview.department" class="form-item" placeholder="请选择部门">
								<el-option v-for="item in departments" :label="item" :key="item" :value="item">{{item}}</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="岗位" prop="station">
							<el-input v-model="interview.station" placeholder="请输入岗位" class="form-item"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="招聘渠道" prop="channel">
							<el-select v-model="interview.channel" style="width: 190px;" placeholder="请选择招聘渠道">
								<el-option v-for="item in channels" :label="item" :key="item" :value="item">{{item}}</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="学校" prop="school">
							<el-input v-model="interview.school" placeholder="请输入学校" class="form-item"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="毕业时间" prop="graduateTime">
							<el-date-picker type="date" placeholder="请选择日期" v-model="interview.graduateTime" style="width: 192px;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8" style="padding-left: 10px;">
						<el-form-item label="现所在公司" prop="presentCompany">
							<el-input v-model="interview.presentCompany" placeholder="请输入所在公司" style="width: 178px;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-upload class="upload-demo" :file-list="fileList" ref="upload" action="/upload"  :on-success="successUpload" :auto-upload="true"  :limit="1" list-type="text">
					<el-button slot="trigger" size="small" type="primary" >上传简历</el-button>
					<div slot="tip" class="el-upload__tip">只支持上传文档文件</div>
				</el-upload>
				<p class="form-label">面试情况</p>
				<el-row>
					<el-col :span="2" style="margin-left: 10px;">电话面试</el-col>
					<el-col :span="6">
						<el-form-item label="面试人" prop="interviewer">
							<el-input type="text" placeholder="请填写面试人" v-model="interview.telephoneInterview.interviewer" style="width:133px;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="时间" prop="telInterTime">
							<el-date-picker type="date" placeholder="请选择日期" v-model="interview.telephoneInterview.time" class="form-item"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="结果" prop="telInterResult">
							<el-radio v-model="interview.telephoneInterview.result" label="通过" style="margin:0px -20px 0px 48px;">通过</el-radio>
							<el-radio v-model="interview.telephoneInterview.result" label="不通过">不通过</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="2" style="margin-left: 10px;">现场面试</el-col>
					<el-col :span="6">
						<el-form-item label="时间" prop="onSiteInterTime">
							<el-date-picker type="date" placeholder="请选择日期" v-model="interview.onSiteInterview.time" style="width: 146px;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="一面结果" prop="telInterOne">
							<el-radio v-model="interview.onSiteInterview.oneSideResult" label="通过" class="form-radio">通过</el-radio>
							<el-radio v-model="interview.onSiteInterview.oneSideResult" label="不通过">不通过</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="二面结果" prop="telInterSecond">
							<el-radio v-model="interview.onSiteInterview.secondSideResult" label="通过" class="form-radio">通过</el-radio>
							<el-radio v-model="interview.onSiteInterview.secondSideResult" label="不通过">不通过</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23" style="margin-left: 10px;">
						<el-form-item label="面试评价">
							<el-input type="textarea" v-model="interview.interviewEvaluate" placeholder="请输入面试评价" style="width: 750px;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" style="padding-left: 10px;">
						<el-form-item label="面试流程结束" prop="end">
							<el-radio v-model="interview.end" :label="true" style="margin: 0px -20px 0px 0px;">是</el-radio>
							<el-radio v-model="interview.end" :label="false">否</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="15">
						<el-form-item label="推荐给其他组" prop="otherDepartment">
							<el-radio v-model="interview.recommended" label="是" style="margin: 0px -20px 0px 0px;">是</el-radio>
							<el-radio v-model="interview.recommended" label="否">否</el-radio>
							<el-select v-show="interview.recommended==='是'" v-model="otherDepartment" style="width: 200px;margin-left: 10px;" placeholder="请选择部门">
								<el-option v-for="item in departments" :label="item" :key="item" :value="item">{{item}}</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" style="padding-left: 10px;">
						<el-form-item label="接收Offer" prop="receiveOffer">
							<el-radio v-model="interview.receiveOffer" label="是" class="form-radio">是</el-radio>
							<el-radio v-model="interview.receiveOffer" label="否">否</el-radio>
						</el-form-item>
					</el-col>
					<el-col :span="15">
						<el-form-item label="拟报到时间">
							<el-date-picker type="date" v-model="interview.reportTime" style="width: 200px;" placeholder="请选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="23" style="margin-left: 10px;">
						<el-form-item label="备注">
							<el-input type="textarea" style="margin-left: 30px;width: 750px;" v-model="interview.remark" placeholder="请输入备注信息"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div style="margin-top: 10px;display: flex;flex-direction: row-reverse;padding-right: 20px;">
			<el-button type="primary" size="small" style="margin-left: 10px;" @click="submitForm('interviewForm')">确定</el-button>
			<el-button size="small" @click="closeDialog">取消</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: 'CreateInterview',
		data() {
			return {
				loading: false,
				visible: true,
				fileList: [],
				departments: [],
				channels: [],
				otherDepartment: '',
				interview: {
					name: '',
					department: '',
					resume: '',
					phone: '',
					channel: '',
					station: '',
					sex: '',
					presentCompany: '',
					school: '',
					graduateTime: null,
					telephoneInterview: {
						time: null,
						interviewer: '',
						result: ''
					},
					recommended: '否',
					onSiteInterview: {
						time: null,
						oneSideResult: '',
						secondSideResult: '',
					},
					interviewEvaluate: '',
					receiveOffer: '',
					reportTime: null,
					end: false,
					remark: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						triggger: 'change'
					}],
					sex: [{
						type: 'string',
						required: true,
						message: '请选择性别',
						triggger: 'change'
					}],
					phone: [{
						required: true,
						message: '请输入电话',
						triggger: 'change'
					}],
					department: [{
						required: true,
						message: '请选择部门',
						triggger: 'change'
					}],
					station: [{
						required: true,
						message: '请输入岗位',
						triggger: 'change'
					}],
					channel: [{
						required: true,
						message: '请选择渠道',
						triggger: 'change'
					}],
					school: [{
						required: true,
						message: '请输入学校',
						triggger: 'change'
					}],
					graduateTime: [{
						type: 'date',
						required: true,
						message: '请选择毕业时间',
						triggger: 'change'
					}]
				}
			}
		},
		methods: {
			init() {
				this.departments = ENV.departments;
				this.channels = ENV.channels;
			},
			submitUpload(){
				this.$refs.upload.submit();
			},
			successUpload(res, file, fileList){
				this.interview.resume = file.name;
			},
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						if(this.interview.recommended === '是') {
							this.interview.department = this.otherDepartment;
						}
						let data = this.interview;
						this.loading = true;
						api.interview.createInter(data, this.CancelToken)
							.then(res => {
								this.loading = false;
								this.visible = false;
								this.$emit('create-succeed');
								this.$message({
									type: 'success',
									message: '录入成功'
								})
							}).catch(err => {
								this.loading = false;
								this.visible = false;
								this.$emit('close');
								let errMessage = getErrMessage('interview', err.response.data);
								this.$message({
									type: 'error',
									message: errMessage
								});
							})
					} else {
						console.log('error submit');
					}
				})
			},
			closeDialog() {
				this.$emit('close');
			}
		},
		mounted() {
			this.init();
			this.cancelToken = new $cancelToken(c => {
				this.cancel = c;
			})
		},
		beforeDestory() {
			this.cancel('取消请求');
		}
	}
</script>

<style scoped>
	 .form-label{
	 		margin: 0px 0px 15px -10px;
	 		font-weight: bold;
	 }
	.form-item {
		width: 220px;
	}
	
	.form-radio {
		margin: 0px -20px 0px 0px;
	}
	
	.form-radio:first-child {
		margin-left: 20px;
	}
	
	.form-row {
		height: 50px;
	}
	
	.p-style {
		margin: 0px 0px 10px 0px;
	}
	
	.upload-demo{
		padding-left: 20px;
		width: 400px;
		margin-bottom: 20px;
	}
</style>