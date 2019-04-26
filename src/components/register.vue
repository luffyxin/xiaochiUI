<template>

	<div class="denglu">

		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="username">
				<el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	export default {
		name: 'login',
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					username: '',
					password: '',
					type: '',
					checkPass: ''
				},
				rules: {
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}


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
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var url = "/xiaochi/user/adduser";
						const params = new URLSearchParams;
						params.append('username', this.ruleForm.username);
						params.append('password', this.ruleForm.password);
						this.$axios.post(url, params).then(res => {
							if (res.data.result.code == '200') {
								this.$router.push({
									path: '/login'
								})
							} else {
								console.log(res.data.result)
								this.$message.error(res.data.result.message);
							}

						})

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
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
