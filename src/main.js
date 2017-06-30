// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueTouch from 'vue-touch'
import MintUI from 'mint-ui'
import VueCalendar from './static/lib/js/calendar';

Vue.config.productionTip = false
Vue.use(VueTouch,{name: 'v-touch'})
Vue.use(MintUI)
axios.interceptors.request.use((config) => {
  MintUI.Indicator.open({text: '加载中...',spinnerType: 'triple-bounce'})
  return config
},(error) => {
  MintUI.Indicator.open({text: '加载中...',spinnerType: 'triple-bounce'})
  Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  MintUI.Indicator.close()
  return response;
}, function (error) {
  MintUI.Indicator.close()
  return Promise.reject(error)
});
Vue.prototype.$http = axios
Vue.use(VueCalendar)   // 加载vue-calendar插件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

