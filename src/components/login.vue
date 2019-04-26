<template>

	<div class="denglu">

		<el-form :model="ruleForm" status-icon size="medium" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="username">
				<el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户类型">
				<el-select v-model="ruleForm.type" placeholder="请选择">
					<el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				ruleForm: {
					username: '',
					password: '',
					type: ''
				},

				type: [{
						value: '0',
						label: '用户'
					},
					{
						value: '1',
						label: '店家'
					},

					{
						value: '2',
						label: '管理员'
					}

				]


			}

		},
		created() {},
		mounted: function() {

		},
		methods: {
			test() {
				var url = "/xiaochi/user/adduser";
				this.$axios.get(url).then(res => {
					console.log(res.data.code);
				})
			},
			submitForm(formName) {

				var url = "/xiaochi/user/login";
				const params = new URLSearchParams;
				params.append('username', this.ruleForm.username);
				params.append('password', this.ruleForm.password);
				params.append('type',this.ruleForm.type);
				this.$axios.post(url, params).then(res => {
					if (res.data.result.code == '1003') {
						var user=JSON.stringify(res.data.result.object);
						var storage=window.localStorage;
						storage.setItem("user",user);
						this.$router.push({
							path: '/'
						})
					} else {
						console.log(res.data.result)
						this.$message.error(res.data.result.message);
					}

				})


			}

		}
	}
</script>
<style>
	.denglu {
		width: 400px;
		margin: 150px auto;
		background: white;
		padding: 50px 40px 20px 10px;
		border-radius: 10px;

	}
</style>
