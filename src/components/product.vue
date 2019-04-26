<template>
	<div>

		<div style="text-align: left;margin-bottom: 20px;">
			<el-button @click="addProduct()">新增商品</el-button>
		</div>
		<el-table :data="goodslist" border style="width:1000px">
			<el-table-column fixed prop="name" label="商品名" width="150">
			</el-table-column>
		
			<el-table-column fixed prop="imagepath" label="图片" width="150">

				<template slot-scope="scope">

					<img v-if="scope.row.imagepath" :src="scope.row.imagepath" height="50" />

				</template>

			</el-table-column>
			<el-table-column fixed prop="introduce" label="介绍" width="150">
			</el-table-column>
			<el-table-column fixed prop="price" label="价格" width="150">
			</el-table-column>
			<el-table-column fixed prop="sellcount" label="销量" width="150">
			</el-table-column>
			<el-table-column fixed prop="stock" label="库存" width="150">
			</el-table-column>

			<el-table-column fixed label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="delCate(scope.row)" type="text" size="small">删除</el-button>
					<el-button type="text" @click="getProbyId(scope.row)" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-right: 750px;margin-top: 20px;">
			<el-pagination @current-change="current_change" layout="prev, pager, next" :page-size="6" :total="pageRes.totalCount">
			</el-pagination>
		</div>

		<el-dialog :title="title" :visible.sync="dialog" width="30%" center>

			<el-form ref="form" :model="product" label-width="80px">
				<el-form-item label="名称">
					<el-input style="width: 300px;" v-model="product.name"></el-input>
				</el-form-item>
				<el-form-item label="价格">
					<el-input-number :precision="2" :controls="contro" style="width: 150px;" v-model="product.price"></el-input-number>
				</el-form-item>

				<el-form-item label="分类">
					<el-select v-model="product.typeid" placeholder="请选择">
						<el-option v-for="item in catelist" :key="item.id" :label="item.typename" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="简介">
					<el-input type="textarea" :rows="4" v-model="product.introduce"></el-input>
				</el-form-item>
				<el-form-item label="库存">
					<el-input-number style="width: 150px;" type="number" v-model="product.stock"></el-input-number>
				</el-form-item>

				<el-form-item label="图片">
					<el-row>
						<el-col :span="6">
							<div class="input-file-box">
								<span>上传图片</span>
								<input type="file" accept="image/*" @change="getProImg($event)" class="uploadfile">
							</div>
						</el-col>
						<el-col :span="12">
							<img v-if="productimgUrl" :src="productimgUrl" style="width: 200px;">
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialog = false">取 消</el-button>
				<el-button type="primary" @click="editProduct()">提 交</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				cate: null,
				catelist: null,
				goodslist: null,
				user: null,
				dialog: false,
				title: '',
				product: {
					name: null,
					typeid: null,
					introduce: null,
					price: null,
					stock: null,
					imagepath: null
				},
				contro:false,
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
				}
			}
		},
		created() {

			this.getCateList();
			this.getGoodsList(1);

		},
		methods: {
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
					if (res.data.result.code == '200') {
						this.goodslist = res.data.result.object.object;
						this.pageRes.totalCount = res.data.result.object.totalCount;
						this.pageRes.totalPage = res.data.result.object.totalPage;
					} else {
						console.log(res.data.result)
						this.$message.error(res.data.result.message);
					}

				})
			},
			current_change(currentpage) {
				this.getGoodsList(currentpage);
			},
			addProduct() {
				this.dialog = true;
				this.title = "新增商品";
			},
			delCate(row) {
				var url = "xiaochi/goods/updategoods/" + this.user.id;
				const params = new URLSearchParams;
				const id = JSON.stringify(row.id);

				params.append("id", id);
				params.append("isdeleted", "1");

				this.$axios.post(url, params).then(res => {
					console.log(res.data.result.code);
					if (res.data.result.code == '200') {
						this.getGoodsList(1);
					} else {
						this.$message.error(res.data.result.message);
					}
				})

			},
			getProbyId(row) {
				// const id=JSON.stringify(row.id);
				var url = "/xiaochi/goods/getgoodsbyid/" + row.id;
				this.$axios.get(url).then(res => {
					if (res.data.result.code == '200') {
						var pro = res.data.result.object;
						this.product.name = JSON.stringify(pro.name);
						this.product.typeid =JSON.stringify(pro.typeid);
						this.product.introduce = JSON.stringify(pro.introduce);
						this.product.price = JSON.stringify(pro.price);
						this.product.stock = JSON.stringify(pro.stock);
						this.product.imagepath = JSON.stringify(pro.imagepath);
						this.title = "修改商品";
						this.dialog = true;
						this.productid = pro.id;
					} else {
						this.$message.error(res.data.result.message);
					}
				})
			},
			editProduct() {
				var url = "/xiaochi/upload/image/upload";
				if (this.productimg != null) {

					var formData = new FormData();
					formData.append("image", this.productimg);
					this.$axios.post(url, formData).then(res => {
						if (res.data.result.code == '0') {
							this.product.imagepath = res.data.imagepath;
							this.postInfo();
						} else {
							this.$message.error(res.data.result.message);
						}
					})
				} else {
					this.postInfo();
				}



			},
			postInfo() {

				var url = "/xiaochi/goods/addgoods/" + this.user.id;

				const params = new URLSearchParams;
				console.log(this.product.imagepath)
				if(this.productid !=null){
					params.append("id", this.productid);
					url = "/xiaochi/goods/updategoods/"+this.user.id;
				}
				params.append("name", this.product.name);
				params.append("typeid", this.product.typeid);
				params.append("price", this.product.price);
				params.append("stock", this.product.stock);
				params.append("imagepath", this.product.imagepath);
				params.append("introduce", this.product.introduce);
				this.$axios.post(url, params).then(res => {
					if (res.data.result.code == '200') {
						this.dialog = false;
						this.getGoodsList(1);
						this.productid =null;
						this.$message.success(res.data.result.message);
					}
				})
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
					if (res.data.result.code == '200') {
						this.catelist = res.data.result.object;
					} else {
						console.log(res.data.result)
						this.$message.error(res.data.result.message);
					}

				})
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
					}
				}
			}
		}

	}
</script>
<style>
	/*外层div*/
	.input-file-box {
		border: 1px solid gray;
		width: 100px;
		height: 30px;
		position: relative;
		text-align: center;
		border-radius: 8px;
	}

	/*文字描述*/
	.input-file-box>span {
		display: block;
		width: 100px;
		height: 30px;
		position: absolute;
		top: 0px;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		color: gray;
	}

	/*input框*/
	.uploadfile {
		opacity: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
</style>
