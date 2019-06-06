import Vue from 'vue';
import App from './App';
import router from './router';
import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';

// Vue.use(vuex);
//ELEMENT_UI
Vue.use(elementUi);
//定义全局axios实例
import axios from 'axios';
Vue.prototype.Axios = axios;
// Vue.prototype.axios = axios.create(
//   {
//     baseURL: 'https://5cd808f00cc5100014f1e33e.mockapi.io/',
//     // timeout: 1000,
//     // headers: {
//     //   'X-Custom-Header': 'foobar'
//     // }
//   }
// );

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
