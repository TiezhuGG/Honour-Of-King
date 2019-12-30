import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryCreate from './views/CategoryCreate'
import CategoryList from './views/CategoryList'
import ItemCreate from './views/ItemCreate'
import ItemList from './views/ItemList'
import HeroCreate from './views/HeroCreate'
import HeroList from './views/HeroList'
import ArticleCreate from './views/ArticleCreate'
import ArticleList from './views/ArticleList'
import AdCreate from './views/AdCreate'
import AdList from './views/AdList'
import AdminUserCreate from './views/AdminUserCreate'
import AdminUserList from './views/AdminUserList'
import Login from './views/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPubilc: true } },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryCreate },
        // props将url参数注入到CategoryCreate组件,在该组件内接受参数(id)后就可直接使用
        { path: '/categories/edit/:id', component: CategoryCreate, props: true },
        { path: '/categories/list', name: 'categories-list', component: CategoryList },

        { path: '/items/create', component: ItemCreate },
        { path: '/items/edit/:id', component: ItemCreate, props: true },
        { path: '/items/list', name: 'items-list', component: ItemList },

        { path: '/heros/create', component: HeroCreate },
        { path: '/heros/edit/:id', component: HeroCreate, props: true },
        { path: '/heros/list', name: 'heros-list', component: HeroList },

        { path: '/articles/create', component: ArticleCreate },
        { path: '/articles/edit/:id', component: ArticleCreate, props: true },
        { path: '/articles/list', name: 'articles-list', component: ArticleList },

        { path: '/ads/create', component: AdCreate },
        { path: '/ads/edit/:id', component: AdCreate, props: true },
        { path: '/ads/list', name: 'ads-list', component: AdList },

        { path: '/admin_users/create', component: AdminUserCreate },
        { path: '/admin_users/edit/:id', component: AdminUserCreate, props: true },
        { path: '/admin_users/list', name: 'admin-users-list', component: AdminUserList },
      ]
    },
  ]
})

// 客户端登录路由限制
// router.beforeEach((to, from, next) => {
//   if (!to.meta.isPubilc && !localStorage.token) {
//     return next('/login')
//   }
//   next()
// })

export default router