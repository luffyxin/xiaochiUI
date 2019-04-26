<template>
	<el-menu :default-active="this.$router.path" router mode="horizontal">
		<el-menu-item :key='0' :index="homeUrl">首页</el-menu-item>
		<el-menu-item v-if="user" :key='1' :index="personinfoUrl">{{user.username}}</el-menu-item>
		<el-menu-item v-if="user == null" :key='2' :index="loginUrl">登陆</el-menu-item>
		<el-menu-item v-if="user == null" :key='3' :index="registerUrl">注册</el-menu-item>
		<el-menu-item v-if="user && user.type =='1'" :index="storemanageUrl">店铺管理</el-menu-item>
		<el-menu-item v-if="user && user.type =='2'" :index="adminUrl">管理员中心</el-menu-item>
		<el-button v-if="user" @click="loginout()" style="margin-top: 6px;float: right;" round>退出</el-button>
	</el-menu>
</template>

<script>
	export default {
		name: 'headerxc',
		methods: {

		},
		created() {
			this.authority()
		},
		data() {
			return {
				homeUrl: '/',
				personinfoUrl: '/center/personinfo',
				storemanageUrl: '/storemanage',
				adminUrl: '/admin',
				loginUrl: '/login',
				registerUrl: '/register',
				user: null
			}
		},
		methods: {
			authority() {
				var storage = window.localStorage;
				//将JSON字符串转换成为JSON对象输出
				var userjson = storage.getItem("user");
				if (userjson != null) {

					this.user = JSON.parse(userjson);
				}

			},
			loginout() {
				var storage = window.localStorage;
				storage.removeItem("user");
				this.user =null;
				this.$router.push({
					path: '/'
				})
			}
		}
	}
</script>

<style>
</style>
