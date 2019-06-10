import Vue from 'vue';
import App from './App';
import router from './router';
import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';
// 导入过滤器
import filter from './common/filter';

// 定义全局过滤器
for (let key in filter) {
  Vue.filter(key, (val, value1, value2) => {
    return filter[key](val, value1, value2);
  });
}

// Vue.use(vuex);
//ELEMENT_UI
Vue.use(elementUi);
//定义全局axios实例
import axios from 'axios';
axios.defaults.baseURL = 'http://172.16.6.72:8080/';
Vue.prototype.AXIOS = axios;
Vue.prototype.Axios = axios;
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.token = sessionStorage.getItem('token');
  return config;

}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// Vue.prototype.AXIOS = axios.create(
//   {
//     baseURL: 'https://172.16.6.72:8080/',
//     // timeout: 1000,
//     headers: {
//       'token': sessionStorage.getItem('token')
//     }
//   }
// );

Vue.config.productionTip = false;

import JSONToExcelConvertor from'./JSONToExcelConvertor/JSONToExcelConvertor';
Vue.prototype.JSONToExcelConvertor=JSONToExcelConvertor;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
