<template>
	<div>
		<el-table :data="goodsList" border style="width: 71%">

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
			<el-table-column label="数量" width="200" prop="count">

			</el-table-column>
			<el-table-column label="小计" width="150" prop="goodTotal">
			</el-table-column>

		</el-table>
		<br>
		<el-form :rules="rules">
			<el-col :span="10">


				<el-form-item label="留言备注" style="width: 400px;">
					<el-input type="textarea" v-model="addOrder.remarks"></el-input>
				</el-form-item>
				<el-form-item style="margin-top: 50px;">
					<el-date-picker type="date" placeholder="选择日期" v-model="date" style="width: 200px;float: left;"></el-date-picker>
					<el-time-picker placeholder="选择时间" v-model="time" style="width: 200px;float: left;"></el-time-picker>
				</el-form-item>

			</el-col>
			<el-col :span="10">
				<el-form-item  label="联系电话" style="width: 400px;">
					<el-input v-model="this.form.tel" type="text"></el-input>
				</el-form-item>
				<el-form-item label="配送地址" style="width: 400px;">
					<el-input v-model="this.form.address" type="text"></el-input>
				</el-form-item>
			</el-col>
		</el-form>
		<el-button @click="submit()" type="success" style="float: right;margin-right: 490px;">{{"付款：" + totalMoney+"￥"}}</el-button>
	</div>


</template>

<script>
	export default {
		data() {
			var checkPhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				} else {
					const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
					console.log(reg.test(value));
					if (reg.test(value)) {
						callback();
					} else {
						return callback(new Error('请输入正确的手机号'));
					}
				}
			};
			return {
				carIdList: {
					carsid: null
				},
				user: null,
				goodsList: null,
				totalMoney: 0,
				addOrder: {
					allprice: null,
					carsid: null,
					time: null,
					remarks: null
				},
				date: null,
				time: null,
				form: {
					id: null,
					username: null,
					tel: null,
					profileimg: null,
					address: null,
					password: null,
				},
				rules: {
					tel: [{
						validator: checkPhone,
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.orderInit();
			this.getUserInfo();

		},
		methods: {
			orderInit() {
				this.carIdList.carsid = this.$route.query.idList;
				this.totalMoney = this.$route.query.totalMoney;
				this.addOrder.allprice = this.totalMoney;
				this.addOrder.carsid = this.carIdList.carsid;
				console.log(this.$route.query.totalMoney);
				var storage = window.localStorage;
				//将JSON字符串转换成为JSON对象输出
				var userjson = storage.getItem("user");
				if (userjson != null) {

					this.user = JSON.parse(userjson);
				}
				console.log(this.carIdList);

				var url = "/xiaochi/order/getordergoods/" + this.user.id;
				this.$axios.post(url, this.carIdList).then(res => {
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

			},
			submit() {


				if (this.form.tel == null || this.form.address == null) {
					this.$message.info("请输入手机号与地址");
					return;
				}

				var date = this.formatDate(this.date, "yyyy-MM-dd");
				var time = this.formatDate(this.time, "hh:mm");
				this.addOrder.time = date + " " + time;
				console.log(this.addOrder);
				if (this.date != null && this.time != null) {
					var url = "xiaochi/order/addorder/" + this.user.id;
					this.$axios.post(url, this.addOrder).then(res => {
						this.$message({
							type: 'success',
							message: "支付成功"
						});
						this.$router.push({
							path: '/center/myorder'
						})
					})
				} else {
					this.$message({
						type: 'info',
						message: "请选择配送时间"
					});
				}

			},
			getUserInfo() {

				var url = "/xiaochi/user/getuserinfo/" + this.user.id;
				this.form.id = this.user.id;
				this.$axios.post(url, this.form).then(res => {
					if (res.data.result.code == '200') {
						if (res.data.result.object.length > 0) {
							var userInfo = res.data.result.object[0];
							this.form.id = userInfo.id;
							this.form.profileimg = userInfo.profileimg;
							this.profileimg = userInfo.profileimg;
							this.form.tel = userInfo.tel;
							this.form.address = userInfo.address;
							this.form.username = userInfo.username;
						}
					} else {
						console.log(res.data.result)
						this.$message.error(res.data.result.message);
					}

				})
			},
			formatDate(date, format) {
				var paddNum = function(num) {
					num += "";
					return num.replace(/^(\d)$/, "0$1");
				}
				//指定格式字符
				var cfg = {
					yyyy: date.getFullYear() //年 : 4位
						,
					yy: date.getFullYear().toString().substring(2) //年 : 2位
						,
					M: date.getMonth() + 1 //月 : 如果1位的时候不补0
						,
					MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
						,
					d: date.getDate() //日 : 如果1位的时候不补0
						,
					dd: paddNum(date.getDate()) //日 : 如果1位的时候补0
						,
					hh: date.getHours() //时
						,
					mm: date.getMinutes() //分
						,
					ss: date.getSeconds() //秒
				}
				format || (format = "yyyy-MM-dd hh:mm:ss");
				return format.replace(/([a-z])(\1)*/ig, function(m) {
					return cfg[m];
				});
			}


		}
	}
</script>

<style>
</style>
