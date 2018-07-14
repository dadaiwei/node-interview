<template>
	<div class="nav">
		<el-menu :default-active="defaultActive" :unique-opened="true" class="el-menu-vertical-demo" background-color="#333744" active-text-color="#fff" text-color="#aeb9c2" style="border-right: none;">
			<template v-for="(menu, index) in menus">
				<template v-if="!menu.children">
					<el-menu-item :index="menu.view" @click="go(menu.target)">
						<i :class="menu.icon"></i>
						<span class="nav-title">{{menu.title}}</span>
					</el-menu-item>
				</template>
				<template v-if="menu.children">
					<el-submenu :index="menu.index">
						<template slot="title">
							<i :class="menu.icon"></i>
							<span class="nav-title">{{menu.title}}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="(c, index) in menu.children" :key="'menuChildren'+index" :index="c.view" @click="go(c.target)">
								<i :class="c.icon"></i>
								<span class="nav-title">{{c.title}}</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
import menus from '@/config/menus'	
export default{
	name: "VHome",
	data(){
		return {
			defaultActive: this.$route.meta.view,
			menus: []
		}
	},
	methods: {
		go(target){
			this.$router.push({
				name: target
			})
		},
		init(){
			let role = sessionStorage.getItem('role');
			this.menus = menus[role];
		}
	},
	watch: {
		$route(){
			let role = sessionStorage.getItem('role');
			this.defaultActive = this.$route.meta.view;
			if(this.$route.meta.role.indexOf(role) === -1){
				if(role === 'user'){
					this.$router.push({name: 'interviewIng'});
				}else{
					this.$router.push({name: 'interview'});
				}
			}
		}
	},
	mounted(){
		this.init();
	}
}
</script>

<style scoped>
	.nav{
		position: absolute;
		left: 0;
		top: 50px;
		height: 100%;
		width: 200px;
		padding-top: 30px;
		background-color: #333744;
	}
	.nav-title{
		font-weight: bold;
		font-size: 15px;
		margin-left: 10px;
	}
	.nav-active{
		color: #FFFFFF;
	}
</style>