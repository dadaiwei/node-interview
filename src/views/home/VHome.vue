<template>
	<div>
		<v-header @change-pwd="changePwd"></v-header>
		<v-aside></v-aside>
		<div v-if="changePwdVisible">
			<change-pwd :pwd="pwd" @close="changePwdVisible = false"></change-pwd>
		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import VHeader from '../common/VHeader'	
import VAside from '../common/VAside'
import ChangePwd from '../changePwd/ChangePwd'
export default{
	name: "VHome",
	data(){
		return {
			pwd: sessionStorage.getItem('password'),
			changePwdVisible: false
		}
	},
	methods: {
		changePwd(){
			this.changePwdVisible = true;
		}
	},
	components: {
		VHeader,
		VAside,
		ChangePwd
	},
 	beforeDestory(){
		cookie.setCookie('isLogin', false);
  }
}
</script>

<style scoped>
	.content{
		position: relative;
		margin: 55px 0px 0px 200px;
		width: calc(100% - 210px);
		height: 100%;
		overflow: auto;
		padding: 5px;
	}
	.fade-enter-active, .fade-leave-active{
		transition: opacity 0.5s;
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
</style>