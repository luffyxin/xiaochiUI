<template>
	<div>
		<el-form ref="form" :model="form" label-width="80px" style="width: 600px;margin-left: 100px;">

			<el-form-item label="头像">
				<el-row>
					<el-col :span="4">
						<div class="input-file-box">
							<span >上传头像</span>
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
				<el-input type="tel" v-model="form.tel"></el-input>
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
					username: '',
					tel: '',
					profileimg: null,
					address: '',
					password: ''

				},
				profileimg: '',
				profileimgFile: null

			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
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
