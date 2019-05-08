<template>
	<el-container>
		<el-header>
			<headerxc style="margin-bottom: 50px;"></headerxc>
			<div style="width: 500px;margin: auto;">
				<el-input v-model="page.keyword" placeholder="搜索菜品">
					<el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
		</el-header>
		<el-container style="margin-top: 100px;">
			<el-aside width="120px" style="margin-top: 100px;margin-left: 100px;">
				<el-tabs @tab-click="handleClick" :tab-position="tabPosition" style="height: 600px;">
					<el-tab-pane v-for="(item,i) in catelist" :key="item.typename" :label="item.typename" :index="item.id"></el-tab-pane>
				</el-tabs>
			</el-aside>
			<el-main>
				<!-- <el-carousel :interval="4000" type="card" height="200px">
					<el-carousel-item v-for="item in 6" :key="item">
						<h3>{{ item }}</h3>
					</el-carousel-item>
				</el-carousel> -->
				<el-alert :title="notice" type="success">
				</el-alert>
				<el-row>
					<el-col :span="4" v-for="(o,i) in goodslist" :key="i" :offset="1">
						<el-card :body-style="{ padding: '0px' }" style="margin-top: 10px;">
							<img :src="o.imagepath" style="width:300px;height: 200px;" class="image">
							<div style="padding: 14px;">
								<span>{{o.name}} </span><span style="color: red;">{{o.price}}￥</span>
								<div class="bottom clearfix">
									<span style="line-height: 1.5;">{{o.introduce}}</span>
									</br>
									<el-button type="text" @click="addcar(o.id)" class="button">加入购物车</el-button>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-pagination @current-change="current_change" small layout="prev, pager, next" :page-size="8" :total="pageRes.totalCount"
				 style="margin-top: 20px;"></el-pagination>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import headerxc from "@/components/headerxc.vue";
	export default {
		name: "home",
		components: {
			headerxc
		},
		data() {
	
			return {
				tabPosition: "left",
				cateCurrent: null,

				cate: null,
				catelist: null,
				goodslist: null,
				user: null,
				dialog: false,
				title: "",
				product: {
					name: null,
					typeid: null,
					introduce: null,
					price: null,
					stock: null,
					imagepath: null
				},
				contro: false,
				productid: null,
				mult: false,
				limit: 1,
				fileList: [],
				productimg: null,
				productimgUrl: null,
				page: {
					pageno: null,
					pagesize: null,
					typeid: null,
					searchid: null,
					keyword: null
				},
				pageRes: {
					totalCount: null,
					totalPage: null
				},
				notice: null,
			
				
			};
		},
		created() {
			this.getCateList();
			this.getGoodsList(1);
			this.getnotice();
		},
		mounted: function() {},
		methods: {
			getnotice() {
				var url = "/xiaochi/info/getpublicinfo";
				this.$axios.get(url).then(res => {
					if (res.data.result.code == "200") {
						this.notice = res.data.result.object.info;
					} else {
						this.$message.error(res.data.result.message);
					}
				});
			},
			search() {
				if (this.page.keyword == null) {
					this.$message.info("请输入关键字");

				} else {
					this.getGoodsList(1);
				}
			},
			getGoodsList(start) {
				var storage = window.localStorage;
				//将JSON字符串转换成为JSON对象输出
				var userjson = storage.getItem("user");
				if (userjson != null) {
					this.user = JSON.parse(userjson);
				}
				var url = "/xiaochi/goods/getgoodslistpage";
				this.page.pageno = start;
				this.page.pagesize = 6;
				this.$axios.post(url, this.page).then(res => {
					if (res.data.result.code == "200") {
						this.goodslist = res.data.result.object.object;
						this.pageRes.totalCount = res.data.result.object.totalCount;
						this.pageRes.totalPage = res.data.result.object.totalPage;
					} else {
						console.log(res.data.result);
						this.$message.error(res.data.result.message);
					}
				});
			},
			addcar(productid) {

				var url = "/xiaochi/user/addshopcar/" + this.user.id + "/" + productid;

				this.$axios.post(url).then(res => {
					if (res.data.result.code == "200") {
						this.$message.success(res.data.result.message);
					} else {
						console.log(res.data.result);
						this.$message.error(res.data.result.message);
					}
				});

			},
			handleClick(tab, event) {
				this.page.keyword = null;
				this.page.typeid = parseInt(this.catelist[tab.index].id);

				this.getGoodsList(1);
			},
			current_change(currentpage) {
				this.getGoodsList(currentpage);
			},
			getCateList() {
				var storage = window.localStorage;
				//将JSON字符串转换成为JSON对象输出
				var userjson = storage.getItem("user");
				if (userjson != null) {
					this.user = JSON.parse(userjson);
				}
				var url = "/xiaochi/goods/getgoodstypelist";
				this.$axios.get(url).then(res => {
					if (res.data.result.code == "200") {
						this.catelist = res.data.result.object;
					} else {
						console.log(res.data.result);
						this.$message.error(res.data.result.message);
					}
				});
			},
			getProImg(event) {
				this.productimg = event.target.files[0];
				// 看支持不支持FileReader
				if (!this.productimg || !window.FileReader) return;
				let self = this;
				if (/^image/.test(this.productimg.type)) {
					// 创建一个reader
					let reader = new FileReader();
					// 将图片将转成 base64 格式
					reader.readAsDataURL(this.productimg);
					// 读取成功后的回调
					reader.onloadend = function() {
						self.productimgUrl = this.result;
					};
				}
			}
		}
	};
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

	.el-carousel__item:nth-child(2n + 1) {
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
		clear: both;
	}
</style>
