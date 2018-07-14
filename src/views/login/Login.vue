<template>
	<div class="login">
		<p>Hik-Interview</p>
		<div class="login-box">
			<div class="head">
				用户登录
			</div>
			<el-form id="loginForm" ref="login" :model="user" :rules="rules" class="form">
				<el-form-item prop="name">
					<el-input v-model="user.name" placeholder="用户名" size="large" :rows="3">
						<template slot="prepend">
							<i class="iconfont icon-yonghu"></i>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" v-model="user.password" placeholder="密码" size="large">
						<template slot="prepend">
							<i class="iconfont icon-mimaxiugai"></i>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item style="margin-bottom: 10px;">
					<el-button class="login-button" type="primary" @click="loginIn('login')">
						登录
					</el-button>
				</el-form-item>
				<p class="err-message">{{errMessage}}</p>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: '',
					password: ''
				},
				errMessage: '',
				rules: {
					name: [
						{required: true, message: '请输入用户名', trigger: 'change'},
						{min: 2, message: '长度在2个字符以上', trigger: 'change'}
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'change'},
						{min: 6, message: '密码长度为6位以上', trigger: 'change'}
					]
				}
			}
		},
		methods: {
			loginIn(formName) {
				this.errMessage = '';
				this.$refs[formName].validate(valid => {
					if(valid){
							let user = this.user;
							api.user.login(user).then(result => {
								let name = user.name;
								let password = user.password;
								sessionStorage.setItem('name', name);
								sessionStorage.setItem('password', password);
								sessionStorage.setItem('role', result.role);
								sessionStorage.setItem('isLogin', true);
								if(result.role === 'admin'){
									this.$router.push({name: 'interview'});
								}else if(result.role === 'user'){
									this.$router.push({name: 'interviewIng'});
								}
							}).catch(err => {
								console.log(err);
								this.errMessage = getErrMessage('user', err.response.data);
							})
					}else{
						console.log('error submit!!!');
						return false;
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
<style scoped>
	.login {
		height: 100vh;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		background: url("../../assets/imgs/login-bg.jpg") no-repeat center fixed;
	}
	
	.login>p {
		position: absolute;
		top: 60px;
		margin: 0px;
		font-size: 60px;
		text-align: center;
		color: #FFFFFF;
	}
	
	.login-box {
		position: absolute;
		top: 180px;
		width: 420px;
		height: 300px;
		background: #FFFFFF;
		border: 1px solid #DCDCDC;
		border-radius: 5px;
	}
	.head{
		padding: 28px;
		font-size: 20px;
		line-height: 20px;
		font-weight: bold;
		text-align: center;
	}
	.form {
		padding: 0 50px;
	}
	.login-button{
		width: 100%;
		height: 40px;
		margin-top: 10px;
		font-size: 16px;
		font-weight: bold;
	}
	.err-message{
		margin: 0px;
		text-align: center;
		color: #f56c6c;
	}
</style>