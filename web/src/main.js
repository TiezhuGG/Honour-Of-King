import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


Vue.config.productionTip = false

// 导入全局样式SCSS
import './style.scss'
import './assets/iconfont/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import Card from './components/Card'
import ListCard from './components/ListCard'
Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)


Vue.prototype.$axios= axios.create({
  baseURL: process.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:5000/web/api'
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
