import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import center from '@/components/center'
import personinfo from '@/components/personinfo'
import myorder from '@/components/myorder'
import register from '@/components/register'
import product from '@/components/product'
import order from '@/components/order'
import category from '@/components/category'
import ad from '@/components/ad'
import storemanage from '@/components/storemanage'
import notice from '@/components/notice'
import car from '@/components/car'
import pay from '@/components/pay'
import admin from '@/components/admin'
import member from '@/components/member'
import storemember from '@/components/storemember'
import foodinfo from '@/components/foodinfo'
Vue.use(Router)

export default new Router({
	routes: [{
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
			path: '/foodinfo',
			name: 'foodinfo',
			component : foodinfo
		},
		{
			path: '/center',
			component: center,
			children: [{
					path: 'personinfo',
					component: personinfo
				},
				{
					path: 'myorder',
					component: myorder
				},{
					path: 'car',
					component:car
				},
				{
					path: 'pay',
					component: pay
				}
			]

		},
		{
			path: '/register',
			component: register
		}, {
			path: '/storemanage',
			component: storemanage,
			children: [{
					path: 'product',
					component: product
				},
				{
					path: 'order',
					component: order
				},
				{
					path: 'category',
					component: category
				},
				{
					path: 'ad',
					component: ad
				},
				{
					path: 'notice',
					component: notice
				}
			]

		},
		{
			path: '/admin',
			component: admin,
			children: [{
					path: 'member',
					component: member
				},
				{
					path: 'storemember',
					component: storemember
				},
			
			]
		
		}
	]
})
