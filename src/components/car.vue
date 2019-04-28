<template>
	<div>
		<el-table :data="goodsList" border style="width: 80%" @selection-change="selected">
			<el-table-column type="selection" width="50">
			</el-table-column>
			<el-table-column label="商品名称" width="680">
				<template slot-scope="scope">
					<div style="margin-left: 50px">
						<el-row>
							<el-col :span="4">

								<img :src="scope.row.goods.imagepath" style="height: 50px;width: 50px">
							</el-col>
							<el-col :span="20">

								<span style="font-size: 18px;">{{scope.row.goods.introduce}}</span>
							</el-col>

						</el-row>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="单价" width="150" prop="goods.price">
			</el-table-column>
			<el-table-column label="数量" width="200">
				<template slot-scope="scope">
					<div>
						<el-input v-model="scope.row.count" @change="handleInput(scope.row)">
							<el-button slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
							<el-button slot="append" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
						</el-input>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="小计" width="150" prop="goodTotal">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
						删除<i class="el-icon-delete2 el-icon--right"></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<br>
		<el-button @click="submit()" type="info" style="float: right;margin-right: 400px;">{{"提交订单：" + moneyTotal+"￥"}}</el-button>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				moneyTotal: 0,
				multipleSelection: [],
				goodsList: null,
				user: null,
				carIdList: []
			}
		},
		created() {

			this.getCurrentUser();
			this.getproduct();

		},
		methods: {
			submit() {
				
				if (this.moneyTotal != 0) {
					if(this.user.isvip == "1"){
						this.moneyTotal = this.moneyTotal -5;
							this.$message({
							type: 'success',
							message: "尊贵的vip用户已经为你的订立减5元"
						});
					}
					this.$router.push({
						path: '/center/pay',
						query: {
							idList: this.carIdList,
							totalMoney: this.moneyTotal
						}
					})
				} else {
					this.$message({
						type: 'info',
						message: "请至少选择一个商品"
					});
				}
			},
			getCurrentUser() {
				var storage = window.localStorage;
				//将JSON字符串转换成为JSON对象输出
				var userjson = storage.getItem("user");
				if (userjson != null) {

					this.user = JSON.parse(userjson);
				}
			},
			handleDelete(index, row) {

				this.$confirm('确定删除该商品？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					row.isdeleted = 1;
					console.log(row);
					var url = "/xiaochi/user/updateshopcar/" + this.user.id;
					this.$axios.post(url, row).then(res => {
						console.log(res.data.result);
						if (res.data.result.code = "200") {
							//删除数组中指定的元素
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getproduct();
						} else {
							this.$message({
								type: 'error',
								message: res.data.result.message
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			handleInput: function(value) {
				if (null == value.count || value.count == "") {
					value.count = 1;
				}
				value.goodTotal = (value.count * value.goods.price).toFixed(2); //保留两位小数
				//增加商品数量也需要重新计算商品总价
				this.selected(this.multipleSelection);
			},
			add: function(addGood) {
				//输入框输入值变化时会变为字符串格式返回到js
				//此处要用v-model，实现双向数据绑定
				if (typeof addGood.count == 'string') {
					addGood.count = parseInt(addGood.count);
				};
				addGood.count += 1;
				this.handleInput(addGood);
			},
			del: function(delGood) {
				if (typeof delGood.count == 'string') {
					delGood.count = parseInt(delGood.count);
				};
				if (delGood.count > 1) {
					delGood.count -= 1;
				}
				this.handleInput(delGood);
			},
			//返回的参数为选中行对应的对象
			selected: function(selection) {
				this.multipleSelection = selection;
				this.moneyTotal = 0;
				this.carIdList = [];
				//此处不支持forEach循环，只能用原始方法了
				for (var i = 0; i < selection.length; i++) {
					//判断返回的值是否是字符串
					if (typeof selection[i].goodTotal == 'string') {
						selection[i].goodTotal = parseInt(selection[i].goodTotal);
					};
					this.moneyTotal += selection[i].goodTotal;
					this.carIdList.push(selection[i].id);
				}
			},
			getproduct() {
				var url = "/xiaochi/user/getusershopcar/" + this.user.id;

				this.$axios.get(url).then(res => {
					if (res.data.result.code == "200") {
						this.goodsList = res.data.result.object;
						console.log(this.goodsList);
						for (var i = 0; i < this.goodsList.length; i++) {
							if (this.goodsList[i].goods != null)
								this.goodsList[i].goodTotal = this.goodsList[i].goods.price * this.goodsList[i].count;
						}
					} else {
						this.$message.error(res.data.result.message);
					}
				})
			}
		}
	}
</script>

<style>
</style>
