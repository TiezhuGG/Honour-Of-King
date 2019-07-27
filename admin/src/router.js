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
			component: () => import('@/views/Main.vue'),
			children: [
				{ path: '/categories/create', component: () => import('@/views/CategoryEdit.vue') },
				{ path: '/categories/edit/:id', component: () => import('@/views/CategoryEdit.vue'), props: true },
				{ path: '/categories/list', component: () => import('@/views/CategoryList.vue') },
			]
		}
	]
})


export default router