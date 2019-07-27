import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/main'
		},
		{
			path: '/main',
			component: () => import('./views/Main.vue')
		}
	]
})


export default router