import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
 {
	 path:'/login',
	 name:'login',
	 component:Login
 },
  {
    path: '/about',
    name: 'about',
	meta: {
	        auth: true
	      },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to,from,next) => {
	//判断路由是否需要登录
	console.log(to);
	if (to.meta.auth) {
		//需要登录
		const token = localStorage.getItem('token');
		if(token){
			next();
		}else{
			next({
				path:'/login',
				query:{redirect:to.path}
			});
		}
		
	} else{
		next();
	}
})

export default router
