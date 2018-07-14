<template>
	<div class="header">
		<div class="logo">
			<span>XXX公司人才管理平台</span>
		</div>
		<div class="login-user">
				<div class="icon-box">
					<svg class="icon icon-user" aria-hidden="true">
						<use xlink:href="#icon-yonghu"></use>
					</svg>
					<span class="header-span">{{username}}</span>
				</div>
				<div class="icon-box" @click="loginOut">
						<svg class="icon cursor" aria-hidden="true">
							<use xlink:href="#icon-tuichudenglu"></use>
						</svg>
					<span class="header-span cursor">登出</span>
				</div>
				<div class="icon-box" @click="changePwd">
						<svg class="icon cursor" aria-hidden="true">
							<use xlink:href="#icon-xiugaimima3"></use>	
						</svg>
					<span class="header-span cursor">修改密码</span>
				</div>
		</div>
	</div>
</template>

<script>
export default{
	name: "VHome",
	data(){
		return {
			username: sessionStorage.getItem('name'),
			password: sessionStorage.getItem('password')
		}
	},
	methods: {
		loginOut(){
			this.$confirm('确定登出？', '确认', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				center: false
			}).then(() => {
				sessionStorage.setItem('isLogin', false);
				sessionStorage.setItem('role', '');
				this.$router.push({name: 'login'});
			}).catch(err => {console.log(err)});
		},
		changePwd(){
			this.$emit('change-pwd');
		},
		init(){
			this.username = sessionStorage.getItem('name');
			this.password = sessionStorage.getItem('password')
		}
	},
	mounted(){
		this.init();
	}
}
</script>

<style scoped>
	.header{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		min-width: 1080px;
		height: 55px;
		background-color: #373D41;
	}
	.logo{
		height: 55px;
		line-height: 55px;
		width: 200px;
		color: #FFFFFF;
		font-weight: bold;
		margin-left: 20px;
	}
	.login-user{
		position: absolute;
		top: 0;
		right: 0;
		height: 55px;
		line-height: 55px;
		display: flex;
		flex-direction: row;
	}
	.icon{
		margin-right: 10px;
	}
	.icon-user{
		color: #FFFFFF;
	}
	.icon-box{
		display: flex;
		margin-right: 30px;
		align-items: center;
	}
	.header-span{
		color: #FFFFFF;
		font-size: 15px;
		font-weight: bold;
		vertical-align: 3px;
	}
	.cursor{
		cursor: pointer;
	}
</style>