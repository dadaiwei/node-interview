import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

var goPath = () =>{
	let role = sessionStorage.getItem('role');
	console.log(role);
	if(role === 'user'){
		return {name: 'interviewIng'};
	}else{
		return {name: 'interview'};
	}
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login'),
      meta: {
      	title: '登录',
      	view: 'login',
      	role: 'admin user'
      }
    },
    {
    	path: '/',
    	name: 'home',
    	component: () => import('@/views/home/VHome'),
    	meta: {
				title: 'home',
				view: 'home',
				role: 'admin user'
			},
    	redirect: goPath(),
    	children: [
    		{
    			path: 'interviewIng',
    			name: 'interviewIng',
    			component: () => import('@/views/interview/interviewIng'),
    			meta: {
    				title: '面试中',
    				view: 'interviewIng',
    				role: 'user'
    			}
    		},
    		{
    			path: 'interviewEnd',
    			name: 'interviewEnd',
    			component: () => import('@/views/interview/interviewEnd'),
    			meta: {
    				title: '面试结束',
    				view: 'interviewEnd',
    				role: 'user'
    			}
    		},
    		{
    			path: 'interview',
    			name: 'interview',
    			component: () => import('@/views/interview/interview'),
    			meta: {
    				title: '部门人才库',
    				view: 'interview',
    				role: 'admin user'
    			}
    		},
    		{
    			path: '*',
    			redirect: goPath()
    		}
    	]
    }
  ]
});
