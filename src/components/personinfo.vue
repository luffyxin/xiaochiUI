<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px" style="width: 600px;text-align:left; margin-left: 100px;">

			<el-form-item label="头像">
				<el-row>
					<el-col :span="4">
						<div class="input-file-box">
							<span>上传头像</span>
							<input type="file" accept="image/*" @change="getProImg($event)" class="uploadfile">
						</div>
					</el-col>
					<el-col :span="12">
						<img v-if="profileimg" :src="profileimg" style="width: 200px;">
					</el-col>
				</el-row>
			</el-form-item>


			<el-form-item label="用户名">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="电话">
				<el-input-number :controls="false" type="tel" v-model="form.tel"></el-input-number>
			</el-form-item>

			<el-form-item label="密码">
				<el-input type="password" v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="地址">
				<el-input type="textarea" v-model="form.address"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
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
					password: null

				},
				user: null,
				profileimg: '',
				profileimgFile: null

			}
		},
		mounted: function() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				var storage = window.localStorage;
				//将JSON字符串转换成为JSON对象输出
				var userjson = storage.getItem("user");
				if (userjson != null) {
					this.user = JSON.parse(userjson);
				}
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
			onSubmit() {


				var url = "/xiaochi/upload/image/upload";
				if (this.profileimgFile != null) {

					var formData = new FormData();
					formData.append("image", this.profileimgFile);
					this.$axios.post(url, formData).then(res => {
						if (res.data.result.code == '0') {
							this.$message.success(res.data.result.message);
							this.form.profileimg = res.data.imagepath;
							this.postInfo();
							console.log(res.data.imagepath);
						} else {
							console.log(res.data.result)
							this.$message.error(res.data.result.message);
						}

					})

				}else{
					this.postInfo();
				}

			},
			postInfo(){
				var url = "/xiaochi/user/updateuserinfo/" + this.user.id;
				this.form.id = this.user.id;
				this.$axios.post(url, this.form).then(res => {
					if (res.data.result.code == '200') {
						this.$message.success(res.data.result.message);
						console.log(res.data.result.object);
					} else {
						console.log(res.data.result)
						this.$message.error(res.data.result.message);
					}
				})
				
			},
			getProImg(event) {
				this.profileimgFile = event.target.files[0];
				// 看支持不支持FileReader
				if (!this.profileimgFile || !window.FileReader) return;
				let self = this;
				if (/^image/.test(this.profileimgFile.type)) {
					// 创建一个reader
					let reader = new FileReader();
					// 将图片将转成 base64 格式
					reader.readAsDataURL(this.profileimgFile);
					// 读取成功后的回调
					reader.onloadend = function() {
						self.profileimg = this.result;
					}
				}
			},
			clearImg: function() {
				this.productImgFile = null;
				this.productImg = null;
			},

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
