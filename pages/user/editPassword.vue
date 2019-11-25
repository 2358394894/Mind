<template>
	<view class="container">
		<view class="title-contents">
			<view class="top-view status" :style="{background: statusColor}"> </view>
			<view class="closeBox" :style="{background: statusColor}">
				<view class="close"></view>
			</view>
		</view>
		<view class="main">
			<view class="headline" v-show="tagIndex === 0">绑定您的手机号<text class="Tips">为了您的账号安全，请绑定手机</text></view>
			<view class="headline" v-show="tagIndex === 1">忘记密码？<text class="Tips">按步骤操作即可重新设置密码</text></view>
			<view class="tagBox">
				<view class="form-list">
					<view class="form">
						<input class="phone" type="number" value="" placeholder="请输入你的手机号" placeholder-style="color: #CCCCCC;" />
						<view class="checkCode">
							<input type="text" value="" placeholder="请输入手机验证码" placeholder-style="color: #CCCCCC;" />
							<text class="operate">发送验证码</text>
						</view>
						<view class="password">
							<input type="text" value="" placeholder="请输入密码" placeholder-style="color: #CCCCCC;" />
							<text class="operate"></text>
						</view>
					</view>
					<view class="agreement">
						<checkbox-group @change="checkboxChange">
							<label>
								<checkbox class="checkbox" value="cb" color="#0A4025" checked="true" />已阅读并同意
							</label>
							<text>《心文用户协议》</text>
						</checkbox-group>
					</view>
					<view class="confirm">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			statusColor:{
				type:String,
				default:"#FFFFFF"
			},
		},
		data() {
			return {
				tagIndex: 0,	// 顶部标签
			}
		},
		onLoad() {},
		methods: {
			// 详情页
			openDetail: function(e) {
				uni.navigateTo({
					url: '/pages/detail/detail',
				})
			},
			checkboxChange: function (e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		overflow: auto;
		background-color: #FFFFFF;
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
			height: auto;
			line-height: 56rpx;
			font-size: 60rpx;
			font-weight: bold;
			color: #000000;
			padding: 66rpx 0 150rpx 66rpx;
			
			.Tips {
				display: block;
				font-size: 13px;
				color: #CCCCCC;
			}
		}
	}
	
	.tagBox {
		padding: 0 66rpx;
		
		.form-list {
			font-size: 26rpx;
			
			/* 输入框 */
			input {
				height: 64rpx;
				border-bottom: 1px solid #CCCCCC;
				margin: 24rpx 0;
			}
			text {
				color: #0A4025;
			}
			/* 右侧图标文本定位 */
			.operate {
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
			}
			.checkCode, .password {
				position: relative;
			}
			/* 密码 */
			.password text {
					width: 42rpx;
					height: 26rpx;
					display: block;
					background-size: cover;
					background-image: url(../../static/images/login_invisible.png);
			}
			/* 用户协议 */
			.agreement {
				display: flex;
				justify-content: flex-end;
				font-size: 10px;
				color: #CCCCCC;
				.checkbox {
					width: 40rpx;
					transform: scale(0.5);
				}
				text {
					margin-left: 4rpx;
				}
			}
		}
		
		.confirm {
			position: fixed;
			left: 50%;
			bottom: 85rpx;
			transform: translateX(-50%);
			width: 618rpx;
			height: 88rpx;
			background-color: #0A4025;
			text-align: center;
			line-height: 88rpx;
			font-size: 17px;
			color: #FFFFFF;
		}
		
	}
</style>
