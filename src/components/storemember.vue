<template>
	<div>
		<el-table :data="users" border style="width: 50%">
			<el-table-column fixed prop="username" label="账号" width="150">
			</el-table-column>
			<el-table-column prop="tel" label="电话" width="120">
			</el-table-column>
			<el-table-column  label="是否是vip" width="120">
				<template slot-scope="scope">
					<el-tag type="warning">{{scope.row.isvip | vip}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column  label="是否被禁用" width="100">
					<template slot-scope="scope">
						<el-tag>{{scope.row.enable | enable}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" :visible.sync="centerDialogVisible" width="30%" center>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="是否禁用">
					<el-select v-model="userinfo.enable" placeholder="请选择">
						<el-option label="禁用" value="0"></el-option>
						<el-option label="启动" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类型选择">
					<el-select v-model="userinfo.type" placeholder="请选择">
						<el-option label="会员" value="0"></el-option>
						<el-option label="店员" value="1"></el-option>
					</el-select>
				</el-form-item>

			</el-form>


			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editmember()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					id: null,
					username: null,
					tel: null,
					profileimg: null,
					address: null,
					password: null,
					type : null,

				},
				user: null,
				users: null,
				currentuser: null,
				centerDialogVisible: false,
				userinfo: {
					id: null,
					type: null,
					enable: null
				}
			}
		},
		filters: {
			vip: function(value) {
				if(value == "0"){
					return "非vip"
				}
				if(vaule =="1"){
					return "vip用户"
				}
			},
			enable :function(value){
				if(value =="0"){
					return "禁用"
				}
				if(value == "2"){
					return "可用"
				}
			}
			
		},
		mounted: function() {
			this.getUserInfo();
		},
		methods: {
			handleClick(row) {
				this.centerDialogVisible = true;
				this.userinfo.id = row.id;
			},
			editmember() {
				var url = "/xiaochi/user/updateuserinfo/" + this.user.id;
				this.$axios.post(url, this.userinfo).then(res => {
					if (res.data.result.code == '200') {
						this.$message.success(res.data.result.message);
						this.centerDialogVisible = false;
						this.clearuserinfo();
						console.log(res.data.result.object);
						this.getUserInfo();
					} else {
						console.log(res.data.result)
						this.$message.error(res.data.result.message);
					}
				})
			},
			clearuserinfo(){
				this.userinfo.id = null;
				this.userinfo.type = null;
				this.userinfo.enable= null;
			},
			getUserInfo() {
				var storage = window.localStorage;
				//将JSON字符串转换成为JSON对象输出
				var userjson = storage.getItem("user");
				if (userjson != null) {
					this.user = JSON.parse(userjson);
				}
				var url = "/xiaochi/user/getuserinfo/" + this.user.id;
				this.form.type = '1';
				this.$axios.post(url, this.form).then(res => {
					if (res.data.result.code == '200') {
						if (res.data.result.object.length > 0) {
							this.users = res.data.result.object;
							console.log(this.users);
						}
					} else {
						console.log(res.data.result)
						this.$message.error(res.data.result.message);
					}

				})
			},
		},
	}
</script>

<style>

</style>
