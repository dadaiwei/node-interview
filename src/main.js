import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from '@/api/index'
import getErrMessage from '@/util/error'
import ViewHeader from '@/views/common/viewHeader/index'
import OperationSearch from '@/views/common/operationSearch/index'
import tableHeaders from '@/config/tableHeaders'
import searchConditions from '@/config/searchConditions'
import tableOperations from '@/config/tableOperations'
import ENV from '@/config/ENV'
import $global from '@/util/global'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(ViewHeader);
Vue.use(OperationSearch);

window.axios = axios;
window.$cancelToken = axios.CancelToken;
window.api = api;
window.getErrMessage = getErrMessage;
window.tableHeaders = tableHeaders;
window.searchConditions = searchConditions;
window.tableOperations = tableOperations;
window.ENV = ENV;
window.$global = $global;


//设置请求超时时间30s
axios.defaults.timeout = 30000;

router.beforeEach((to, from, next) => {
	let isLogin = sessionStorage.getItem("isLogin");
	if((isLogin === 'false') || !isLogin){
		if(to.name !== 'login'){
			next({name: 'login'});
			return;
		}else{
			next();
			return;
		}
	}else{
		if(to.name === 'login'){
			next(from.path);
			return;
		}else{
			next();
			return;
		}
	}
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});


