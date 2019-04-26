<template>
	<el-container>
		<el-header>
			<headerxc style="margin-bottom: 50px;"></headerxc>
			<div style="width: 500px;margin: auto;">
				<el-input placeholder="搜索菜品">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
		</el-header>
		<el-container style="margin-top: 100px;">
			<el-aside width="110px" style="margin-top: 260px;margin-left: 100px;">
				<el-tabs v-model="cateCurrent" :tab-position="tabPosition" style="height: 600px;">
					<el-tab-pane v-for="(item,i) in categoryList" :key="i" :index="item.name" :label="item.name">
					</el-tab-pane>
				</el-tabs>
			</el-aside>
			<el-main>
				<el-carousel :interval="4000" type="card" height="200px">
					<el-carousel-item v-for="item in 6" :key="item">
						<h3>{{ item }}</h3>
					</el-carousel-item>
				</el-carousel>
				<el-row>
					<el-col :span="4" v-for="(o, index) in 8" :key="o" :offset="1">
						<el-card :body-style="{ padding: '0px' }" style="margin-top: 10px;">
							<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
							<div style="padding: 14px;">
								<span>好吃的汉堡</span>
								<div class="bottom clearfix">
									<span>好吃的汉堡</span>
									<el-button type="text" class="button">操作按钮</el-button>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-pagination small layout="prev, pager, next" :total="50" style="margin-top: 20px;">
				</el-pagination>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import headerxc from '@/components/headerxc.vue'
	export default {
		name: 'home',
		components: {
			headerxc
		},
		data() {
			return {

				tabPosition: 'left',
				cateCurrent: null,
				categoryList: [{
						id: '1',
						name: '本店特色'
					},
					{
						id: '2',
						name: '当季蔬菜'
					},
					{
						id: '3',
						name: '小火锅'
					},

				]
			}
		},
		created() {
		},
		mounted: function() {

		},
		methods: {

		}
	}
</script>
<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
