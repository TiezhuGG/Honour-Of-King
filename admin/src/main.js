import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import './style.css'

Vue.config.productionTip = false

Vue.prototype.$axios = http

// 获得token加入请求头
// element-ui文件上传用的是自带的请求库,axios拦截器无法拦截
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$axios.defaults.baseURL + 'upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
