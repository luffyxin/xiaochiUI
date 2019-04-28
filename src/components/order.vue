<template>
	<div>
		<el-card class="box-card" v-for="o in orderList" style="width: 1100px;margin-bottom: 10px;">
			<div slot="header" class="clearfix">
				<span style="float: left;">订单编号：<span style="color: coral;">{{o.orderid}}</span></span>
				<span>时间：<span style="color: green;">{{o.addtime}}</span></span>
				<span style="margin-left: 100px;">总价：<span style="color: red;">{{o.allprice}}</span>￥</span>


				<el-popover placement="right" width="600" trigger="click">
					<el-table :data="currentOrder" border style="width: 100%">

						<el-table-column label="商品名称" width="350">
							<template slot-scope="scope">
								<div>
									<el-row>
										<el-col :span="4">

											<img :src="scope.row.goods.imagepath" style="height: 50px;width: 50px">
										</el-col>
										<el-col :span="20">

											<span style="font-size: 18px;">{{scope.row.goods.name}}</span>
										</el-col>

									</el-row>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="单价" width="150" prop="goods.price">
						</el-table-column>
						<el-table-column label="数量" width="200" prop="count">
						</el-table-column>
					</el-table>
					<el-button @click="getOrderInfo(o.orderid)" slot="reference" style="float: right; padding: 3px 0" type="text">订单详情</el-button>
				</el-popover>


			</div>
			<div>
				<span style="float: left;">买家备注：{{o.remarks}}</span>
				<span>配送时间：<span style="color: red;">{{o.deliverytime}}</span></span>
				<el-button @click="stateChange(o.orderid)" style="float: right;" type="primary">{{o.state | stateFilter}}</el-button>
			</div>
			<div>
				<span style="float: left;"> 联系人： {{o.userInfo.username}}</span>
				<span> 联系电话： {{o.userInfo.tel}}</span>
				<span style="margin-left: 300px;"> 联系地址：{{o.userInfo.address}}</span>
			</div>

		</el-card>
		<el-pagination @current-change="current_change" small layout="prev, pager, next" :page-size="5" :total="page.totalCount"
		 style="margin-top: 20px;margin-right: 600px;"></el-pagination>
	</div>
</template>

<script>
	export default {
		filters: {
			stateFilter: function(value) {
				if (value == "0") {
					return "待配送"
				}
				if (value == "1") {
					return "已配送"
				}
				if (value == "2") {
					return "已完成"
				}

			}
		},
		data() {
			return {
				page: {
					pageno: null,
					pagesize: null,
					state: null,
					totalCount: null,
					totalPage: null
				},
				user: null,
				orderList: null,
				currentOrder: null,
				state: {
					orderid: null,
					state: null,
					isdeleted: null
				}
			}
		},
		created() {
			this.getCurrentUser();
			this.getOrder(1);
		},
		methods: {
			getOrder(start) {
				var url = "/xiaochi/order/getorderlistpage/" + this.user.id;
				this.page.pageno = start;
				this.page.pagesize = 5;
				this.$axios.post(url, this.page).then(res => {
					if (res.data.result.code == "200") {
						this.page.totalCount = res.data.result.object.totalCount;
						this.page.totalPage = res.data.result.object.totalPage;
						this.orderList = res.data.result.object.object;
						console.log(this.orderList);
					} else {
						this.$message.error(res.data.result.message);
					}
				})
			},
			current_change(currentpage) {
				this.getOrder(currentpage);
			},
			getCurrentUser() {
				var storage = window.localStorage;
				//将JSON字符串转换成为JSON对象输出
				var userjson = storage.getItem("user");
				if (userjson != null) {

					this.user = JSON.parse(userjson);
				}
			},
			stateChange(orderid) {


					var url = "/xiaochi/order/updateorder/" + this.user.id;
					this.state.orderid = orderid;
					this.state.state = "1";
					this.$axios.post(url, this.state).then(res => {
						this.getOrder(1);
					})
				

			},
			getOrderInfo(oid) {
				var url = "xiaochi/order/getorderdetail/" + this.user.id + "/" + oid;
				this.$axios.get(url).then(res => {
					console.log(res.data.result);
					if (res.data.result.code == "200") {
						this.currentOrder = res.data.result.object;
					}
				})
			}
		}



	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}
</style>
