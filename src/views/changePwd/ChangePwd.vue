<template>
	<el-dialog v-loading="loading" element-loading-text="加载中" title="密码修改" :visible.sync="visible" width="500px" @close="closeDialog">
		<el-form ref="pwdForm" :model="password" :rules="rules" lable-position="left" label-width="100px">
			<el-row>
				<el-col :span="20" :offset="1">
					<el-form-item label="原始密码" prop="oldPwd">
						<el-input type="password" v-model="password.oldPwd"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20" :offset="1">
					<el-form-item label="新密码" prop="newPwd">
						<el-input type="password" v-model="password.newPwd"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20" :offset="1">
					<el-form-item label="确认密码" prop="confirmPwd">
						<el-input type="password" v-model="password.confirmPwd"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20" :offset="1">
					<el-form-item>
						<el-button @click="visible = false">取消</el-button>
						<el-button type="primary" @click="submitPwd('pwdForm')">确定</el-button>
					</el-form-item>
				</el-col>
			</el-row>	
		</el-form>
		<el-dialog title="警告" width="25%" :visible.sync="innerVisible" append-to-body>
			<p style="color: #E6A23C; text-align: center; font-size: 15px;">{{innerMessage}}</p>
			<el-row>
				<el-col :span="8" :offset="10">
					<el-button type="primary" size="small" @click="innerVisible = false">确定</el-button>
				</el-col>
			</el-row>
		</el-dialog>
	</el-dialog>
</template>

<script>
	export default{
		name: 'ChangePwd',
		props: {
			pwd: {
				type: String,
				required: true
			}
		},
		data(){
			var validatorConfirm = (rule, value, callback) => {
				if(!value){
					callback(new Error('请确认密码'));
				}else{
					if(value !== this.password.newPwd){
						callback(new Error('密码必须一致'));
					}else{
						callback();
					}
				}
			};
			return {
				visible: true,
				loading: false,
				password: {
					oldPwd: '',
					newPwd: '',
					confirmPwd: ''
				},
				innerVisible: false,
				innerMessage: '',
				rules: {
					oldPwd: [
						{required: true, message: '请输入原始密码', trigger: 'change'}
					],
					newPwd:[
						{required: true, message: '请输入新密码', trigger: 'change'},
						{min: 6, message: '6~24个字符，可使用大小写字母、数字和英文标点', trigger: 'change'}
					],
					confirmPwd: [
						{required: true, message: '请确认密码', trigger: 'change'},
						{validator:validatorConfirm,  trigger: 'change'}
					]
				}
			}
		},
		methods: {
			closeDialog(){
				this.$emit('close');
			},
			submitPwd(formName){
				this.$refs[formName].validate(valid => {
					if(valid){
						if(this.password.oldPwd !== this.pwd){
							this.innerVisible = true;
							this.innerMessage = '原始密码输入错误，请重新输入'
						}else if(this.password.newPwd === this.password.oldPwd){
							this.innerVisible = true;
							this.innerMessage = '新密码不能与原始密码相同';
						}else{
							let data = {
								"name": sessionStorage.getItem('name'),
								"new-password": this.password.newPwd
							};
							this.loading = true;
							api.user.changePwd(data).then(result => {
								this.loading = false;
								this.$emit('close');
								sessionStorage.setItem('password', this.password.newPwd);
								this.$message({
									type: 'success',
									message: '修改成功'
								});
								this.visible = false;
							}).catch(err => {
								this.loading = false;
								this.$emit('close');
								let errMessage = getErrMessage('user', err.response.data);
								this.$message({
									type: 'error',
									message: errMessage
								})
							})
						}
					}else{
						console.log('error submit');
					}
				})
			}
		},
		mounted(){
			this.cancelToken = new $cancelToken(c => {
				this.cancel = c;
			})
		},
		beforeDestory(){
			this.cancel('取消请求');
		}
	}
</script>

<style>
</style>