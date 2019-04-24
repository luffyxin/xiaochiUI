<template>
	<el-container>
		<el-header>个人中心页面</el-header>
		<el-container>
			<el-aside width="200px">
				<el-row class="tac">
					<el-col >
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
	export default {
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
					}
				]
			}
		}
	}
</script>

<style>
</style>
