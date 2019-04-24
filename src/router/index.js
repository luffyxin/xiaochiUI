import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import center from '@/components/center'
import personinfo from '@/components/personinfo'
import myorder from '@/components/myorder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/center',
			component: center,
			children: [
        {
          path: 'personinfo',
          component: personinfo
        },
				{
				  path: 'myorder',
				  component: myorder
				}
      ]
			
		}
  ]
})
