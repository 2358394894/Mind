<template>
	<view class="container">
		<view class="title-contents">
			<view class="top-view status" :style="{background: statusColor}"> </view>
			<view class="closeBox" :style="{background: statusColor}">
				<view class="close" @tap="backButton"></view>
			</view>
		</view>
		<view class="main">
			<view class="headline">加入心文</view>
			<view class="tagBox">
				<!-- 切换标签 -->
				<view class="titles">
					<text class="titles-text" :class="[tagIndex === 0 ? 'tag-active' : '']" @tap="tagIndex === 0 ? 'return' : tagIndex = 0">登录<text
						 :class="[tagIndex === 0 ? 'hemline' : '']"></text></text>
					<text class="titles-text" :class="[tagIndex === 1 ? 'tag-active' : '']" @tap="tagIndex === 1 ? 'return' : tagIndex = 1">注册<text
						 :class="[tagIndex === 1 ? 'hemline' : '']"></text></text>
				</view>
				<!-- 登录列表 -->
				<view class="login-list" v-show="tagIndex === 0">
					<view class="form">
						<input type="number" v-model="phone" placeholder="请输入你的手机号" placeholder-style="color: #CCCCCC;" />
						<view class="password">
							<input type="text" :password="!lpwCode" v-model="password" placeholder="请输入你的密码" placeholder-style="color: #CCCCCC;" />
							<text :class="[lpwCode ? 'visible' : 'invisible']"  @tap="lpwCode = !lpwCode"></text>
						</view>
					</view>
					<view class="forget">忘记密码</view>
					<view class="btn login-btn" @tap="submit">登录</view>
					<view class="thirdparty">
						<view class="splitLine">
							<text></text>第三方登录<text></text>
						</view>
						<view class="login-type">
							<view class="icon wx"></view>
							<view class="icon qq"></view>
							<view class="icon wb"></view>
						</view>
					</view>
				</view>
				<!-- 注册列表 -->
				<view class="regist-list" v-show="tagIndex === 1">
					<view class="form">
						<input type="number" v-model="regData.phone" placeholder="请输入你的手机号" placeholder-style="color: #CCCCCC;" />
						<view class="checkCode">
							<input type="number" v-model="regData.code" placeholder="请输入手机验证码" placeholder-style="color: #CCCCCC;" />
							<text @tap="sendSms">发送验证码</text>
						</view>
						<input type="text" v-model="regData.nickName" placeholder="昵称" placeholder-style="color: #CCCCCC;" />
						<view class="password">
							<input type="text" v-model="regData.password" :password="!rpwCode" placeholder="请输入你的密码" placeholder-style="color: #CCCCCC;" />
							<text :class="[rpwCode ? 'visible' : 'invisible']"  @tap="rpwCode = !rpwCode"></text>
						</view>
					</view>
					<view class="agreement">
						<checkbox-group @change="checkboxChange">
							<label>
								<checkbox class="checkbox" :checked="regCheck" color="#0A4025" />已阅读并同意
							</label>
							<text>《心文用户协议》</text>
						</checkbox-group>
					</view>
					<view class="btn regist-btn" @tap="submit">注册</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			statusColor: {
				type: String,
				default: '#FFFFFF'
			}
		},
		data() {
			return {
				tagIndex: 0, // 顶部标签
				lpwCode: false,
				rpwCode: false,
				phone: null,
				password: null,
				// 注册数据
				regData: {
					'phone': null,	// 手机号
					'code': null,	// 验证码
					'nickName': null,	// 昵称
					'password': null,	// 密码
				},
				regCheck: false	// 协议
			}
		},
		onLoad() {},
		methods: {
			// 数据提交
			submit: function() {
				let that = this;
				if (this.tagIndex === 0) {
					var phone, password;
					var pattern = /^1[34578]\d{9}$/;
					if (pattern.test(this.phone)) { 
						phone = this.phone
					} else {
						return this.toastMsg('请输入有效手机号')
					}
					// 判断 字符串中是否存在' ', -1表示不存在(this.password.indexOf(' ') != -1)
					var regex = /[a-zA-Z0-9]{6,20}/;
					if (!regex.test(this.password)) {
						return this.toastMsg('请输入至少六位字符密码')
					} else if (this.password.indexOf(' ') != -1) {
						return this.toastMsg('密码不能包含空格')
					} else {
						password = this.password
					}
					let url = '/login/login'
					let data = {
						"password": password,
						"phone": phone
					}
					this.$axios.request({
						url: url,
						method: 'post',
						data: data
					}).then(function(res) {
						if (res.statusCode === 200) {
							if (res.data.resultCode === 1) {
								var token = res.data.data.token,
									userId = res.data.data.userId;
								uni.setStorage({
									key: 'Login_status',
									data: {
										userId: userId,
										token: token
									},
									success: function () {
										console.log(JSON.stringify(uni.getStorageSync('Login_status')));
										uni.showToast({
											icon: 'success',
											mask: true,
											title: '登录成功!'
										})
										uni.switchTab({
											url: '/pages/index/index'
										})
									}
								});
							} else {
								return that.toastMsg('账号密码不匹配!')
							}
						} else {
							return that.toastMsg('发生错误,请稍后再试！')
						}
					}).catch(function(error) {
						// 处理 getJSON 和 前一个回调函数运行时发生的错误
						console.log('发生错误！', error)
					})
				}
				else if (this.tagIndex === 1) {
					var phone, code, nickName, password;
					phone = that.regData.phone;
					code = that.regData.code;
					nickName = that.regData.nickName.replace(/(^\s*)|(\s*$)/g, ""); // 去掉首尾空格
					password = that.regData.password;
					var checkCode = that.checking(phone, code, nickName, password)
					if (checkCode) {
						if (!that.regCheck) {
							return that.toastMsg('请阅读用户协议!')
						}
						// console.log(phone, code, nickName, password);
						let data = {
							"phone": phone,
							"code": code,
							"nickName": nickName,
							"password": password
						}
						this.$axios.request({
							url: '/login/regist',
							method: 'post',
							data: data
						}).then(function(res) {
							if (res.statusCode === 200) {
								if (res.data.resultCode === 1) {
									that.tagIndex = 0;
									that.regData.phone = '';
									that.regData.code = '';
									that.regData.nickName = '';
									that.regData.password = '';
									uni.showToast({
										icon: 'success',
										title: '注册成功!'
									})
								} else if (res.data.resultCode === 102) {
									// 验证码失效
									return that.toastMsg(res.data.resultMsg)
								}
							} else {
								return that.toastMsg('发生错误,请稍后再试！')
							}
						}).catch(function(error) {
							// 处理 getJSON 和 前一个回调函数运行时发生的错误
							console.log('发生错误！', error)
						})
					}
					// else {
					// 	console.log('fail')
					// }
				}
			},
			// 发送验证码
			sendSms: function () {
				let that = this;
				var pattern = /^1[34578]\d{9}$/;
				if (that.regData.phone == '' || !pattern.test(that.regData.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号',
					})
					return false;
				}
				this.$axios.request({
					url: '/login/sendSms',
					method: 'post',
					data: {
						"phone": that.regData.phone
					}
				}).then(function(res) {
					// console.log(typeof(res.statusCode),typeof(res.data.resultCode)); // number number
					if (res.statusCode === 200 && res.data.resultCode === 1) {
						uni.showToast({
							icon: 'none',
							title: '发送成功，请注意查收!',
						})
					}
				})
			},
			// 格式验证
			checking: function (a,b,c,d) {
				// 手机号
				var regA = /^1[34578]\d{9}$/;
				if (!regA.test(a)) {
					this.toastMsg('请输入有效手机号')
					return 0;
				}
				// 验证码
				var regB = new RegExp(/^\d{6}$/);
				if (!regB.test(b)) {
					this.toastMsg('请输入正确验证码')
					return 0;
				}
				// 昵称(首尾不能为空，中间可输入空格)
				var regC = new RegExp(/^[\w\u4e00-\u9fa5\-_][\s\w\u4e00-\u9fa5\-_]*[\w\u4e00-\u9fa5\-_]$/);
				if (!regC.test(c)) {
					this.toastMsg('请输入有效昵称')
					return 0;
				}
				// 密码
				var regD = new RegExp(/[a-zA-Z0-9]{6,20}/);
				if (!regD.test(d)) {
					this.toastMsg('请输入至少六位字符密码')
					return 0;
				} else if (d.indexOf(' ') != -1) {
					this.toastMsg('密码不能包含空格')
					return 0;
				}
				// 验证通过
				return 1;
			},
			// 详情页
			openDetail: function(e) {
				uni.navigateTo({
					url: '/pages/detail/detail'
				})
			},
			checkboxChange: function(e) {
				this.regCheck = !this.regCheck;
			},
			// 提示内容
			toastMsg: function (e) {
				uni.showToast({
					icon: 'none',
					title: e,
					position: 'bottom' // 5+app
				})
				return false;
			},
			// 返回上一页
			backButton: function() {
				// uni.navigateBack({ delta: 1 })
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		overflow: auto;
		background-color: #ffffff;
		font-size: 15px;
	}

	.title-contents {
		height: calc(var(--status-bar-height) + 44px);
	}

	.status {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.closeBox {
		width: 100%;
		height: 44px;
		line-height: 44px;
		overflow: hidden;
		position: fixed;
		top: var(--status-bar-height);
		display: flex;
		align-items: center;

		.close {
			width: 44rpx;
			height: 44rpx;
			background-size: cover;
			background-image: url(../../static/images/nav_close.png);
			margin-left: 24rpx;
		}
	}

	.main {
		flex: 1;
		width: 750rpx;

		.headline {
			height: 56rpx;
			line-height: 56rpx;
			font-size: 60rpx;
			font-weight: bold;
			color: #000000;
			padding: 66rpx 0 150rpx 66rpx;
		}
	}

	.tagBox {
		padding: 0 66rpx;

		/* 标签栏 */
		.titles {
			display: flex;
			align-items: center;

			width: 100%;
			height: 88rpx;
			font-size: 34rpx;
			color: #999999;
			padding-bottom: 64rpx;

			.titles-text {
				margin-right: 82rpx;
			}

			.tag-active {
				color: #000000;
				position: relative;
			}

			.hemline {
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translate(-50%, 12rpx);
				width: 42rpx;
				height: 4rpx;
				display: block;
				background-color: #000000;
			}
		}

		.login-list {
			.forget {
				display: flex;
				flex-direction: row-reverse;
				font-size: 13px;
				color: #999999;
			}

			.login-btn {
				margin-top: 140rpx;
				margin-bottom: 100rpx;
			}

			.thirdparty {

				/* 第三方登录分割线 */
				.splitLine {
					width: 100%;
					height: 60rpx;
					font-size: 12px;
					color: #999999;
					display: flex;
					justify-content: space-between;
					align-items: center;

					text {
						width: 190rpx;
						height: 1px;
						background-color: #cccccc;
					}
				}

				.login-type {
					display: flex;
					justify-content: space-around;
					margin-top: 20rpx;

					.icon {
						width: 44rpx;
						height: 44rpx;
						background-size: cover;
					}

					.qq {
						background-image: url(../../static/images/share_wxF.png);
					}

					.wx {
						background-image: url(../../static/images/share_qq.png);
					}

					.wb {
						background-image: url(../../static/images/share_wb.png);
					}
				}
			}
		}

		.regist-list {
			.checkCode {
				position: relative;

				text {
					z-index: 10;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
					color: #0a4025;
				}
			}

			.agreement {
				display: flex;
				justify-content: flex-end;
				font-size: 10px;
				color: #cccccc;

				.checkbox {
					width: 40rpx;
					transform: scale(0.5);
				}

				text {
					margin-left: 4rpx;
					color: #0a4025;
				}
			}

			.regist-btn {
				margin-top: 200rpx;
			}
		}

		.form {
			font-size: 26rpx;

			input {
				height: 64rpx;
				border-bottom: 1px solid #cccccc;
				margin: 24rpx 0;
			}

			.password {
				position: relative;

				text {
					z-index: 10;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
					width: 42rpx;
					height: 26rpx;
					display: block;
					background-size: cover;
				}
				
				.visible {
					background-image: url(../../static/images/login_visible.png);
				}
				.invisible {
					background-image: url(../../static/images/login_invisible.png);
				}
			}
		}

		.btn {
			height: 88rpx;
			background-color: #0a4025;
			text-align: center;
			line-height: 88rpx;
			font-size: 17px;
			color: #ffffff;
		}
	}
</style>
