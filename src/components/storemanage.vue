<template>
	<el-container>
		<el-header style="margin-bottom: 40px;">
			<headerxc></headerxc>
		</el-header>
		<el-container >
			<el-aside width="200px">
				<el-row class="tac">
					<el-col>
						<h5>店铺管理</h5>

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
						name: '/storemanage/product',
						navItem: '商品管理'
					},
					{
						name: '/storemanage/order',
						navItem: '订单'
					},{
						name: '/storemanage/category',
						navItem: '分类'
					},
					// {
					// 	name: '/storemanage/ad',
					// 	navItem: '轮播图'
					// },
					// 
					{
						name: '/storemanage/notice',
						navItem: '公告'
					}
				]
			}
		}
	}
</script>

<style>
</style>