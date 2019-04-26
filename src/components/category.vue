<template>
	<div>

		<div style="text-align: left;margin-bottom: 20px;">
			<el-input style="width: 300px;" v-model="cate" placeholder="新的分类"></el-input>
			<el-button @click="addCate()">新增分类</el-button>
		</div>
		<el-table :data="catelist" border style="width: 251px">
			<el-table-column fixed prop="typename" label="分类名" width="150">
			</el-table-column>

			<el-table-column fixed label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="delCate(scope.row)" type="text" size="small">删除</el-button>
					<el-button type="text" @click="openDialog(scope.row)" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog title="修改" :visible.sync="dialog" width="30%" center>
			<el-input v-if="editcate" type="text" v-model="editcate.typename"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialog = false">取 消</el-button>
				<el-button type="primary" @click="editCate()">提 交</el-button>
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
				user: null,
				dialog: false,
				editcate: {
					id: null,
					typename : null
				}
				
			}
		},
		created() {

			this.getCateList();


		},
		methods: {
			editCate(){
				var url = "/xiaochi/goods/updategoodstype/" + this.user.id;
			
				this.$axios.post(url, this.editcate).then(res => {
					if (res.data.result.code == '200') {
						this.dialog =false;
						this.$message.success(res.data.result.message);
						this.getCateList();
					} else {
						this.$message.error(res.data.result.message);
					}
				
				})
			},
			openDialog(row){
				console.log(this.dialog);
				this.dialog =true;
				this.editcate.id =row.id;
				this.editcate.typename =row.typename;
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
			addCate() {
				var url = "xiaochi/goods/addgoodstype/" + this.user.id;
				const params = new URLSearchParams;
				params.append("typename", this.cate);
				this.$axios.post(url, params).then(res => {
					if (res.data.result.code == '200') {
						this.$message.success(res.data.result.message);
						this.getCateList();
					} else {
						this.$message.error(res.data.result.message);
					}

				})
			},
			delCate(row) {

				var url = "/xiaochi/goods/updategoodstype/" + this.user.id;
				const goodsType = {
					id: row.id,
					isdeleted: '1'
				}
				this.$axios.post(url, goodsType).then(res => {
					if (res.data.result.code == '200') {
						this.$message.success(res.data.result.message);
						this.getCateList();
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
