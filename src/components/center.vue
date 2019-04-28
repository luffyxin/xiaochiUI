<template>
	<el-container>
		<el-header style="margin-bottom: 40px;">
			<headerxc></headerxc>
		</el-header>
		<el-container >
			<el-aside width="200px">
				<el-row class="tac">
					<el-col>
						<h5>个人中心</h5>

						<el-menu :default-active="this.$router.path" router>
							<el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
								{{ item.navItem }}
							</el-menu-item>
						</el-menu>
					</el-col>
				</el-row>
			</el-aside>
			<el-main>
				<router-view></router-view>

			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import headerxc from '@/components/headerxc.vue'
	export default {
		components: {
			headerxc
		},
		methods: {

		},
		data() {
			return {
				navList: [{
						name: '/center/personinfo',
						navItem: '个人信息'
					},
					{
						name: '/center/myorder',
						navItem: '我的订单'
					},{
						name: '/center/car',
						navItem: '购物车'
					}
				]
			}
		}
	}
</script>

<style>
</style>
