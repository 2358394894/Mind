<template>
	<view>
		<view class="header status-bar" :style="{'height':titleBarHeight,'padding-top':statusBarHeight,'background-color': nav.bg,'border-bottom': nav.borderStyle}">
			<text class="header-icon left-icon" :style="{'background-image': nav.leftIcon}" v-if="nav.isdisPlayNavTitle" @tap="backButton"></text>
			<!-- #ifdef APP-PLUS -->
			<text class="header-icon right-icon" :style="{'background-image': nav.rightIcon}" v-if="nav.isRightType === 1" @tap="rightButton(nav.rightText)"></text>
			<text class="header-icon right-text" v-if="nav.isRightType === 2" @tap="rightButton(nav.rightText)">{{nav.rightText}}</text>
			<!-- #endif -->
			<view class="header-title">{{nav.navTitle}}</view>
		</view>
		<!-- 自定义导航栏占位 -->
		<view :style="{'height':titleBarHeight,'padding-top':statusBarHeight}"></view>
	</view>
</template>

<script>
	export default {
		props: ["nav"],
		data() {
			return {
				statusBarHeight: 0, // 状态栏高度
				titleBarHeight: 0,	// 标题栏高度
			}
		},
		created() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					// console.log(res)
					// if (res.model.indexOf('iPhone') !== -1) {
					// 	that.titleBarHeight = 44 + 'px';
					// } else {
					// 	that.titleBarHeight = 48  + 'px';
					// }
					that.titleBarHeight = 44 + 'px';
					that.statusBarHeight = res.statusBarHeight + 'px'
				},

			})
		},
		methods: {
			// 回到上一页
			backButton: function() {
				// uni.navigateBack({ delta: 1 })
				uni.navigateBack();
			},
			rightButton: function (val) {
				this.$emit("tapRightButton", val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		display: flex;
		align-items: center;
		top: 0;
		position: fixed;
		width: 100%;
		z-index: 999;
		left: 0;
		
		/* border-bottom-width: 1px;
		border-bottom-color: #FFB400;
		border-bottom-style: solid; */
	}

	.header .header-title {
		position: absolute;
		left: 50%;
		bottom: 14px;
		transform: translateX(-50%);
		font-size: 15px;
	}
	/* 图标 */
	.header-icon {
		width: 50rpx;
		height: 50rpx;
		background-size: cover;
		position: absolute;
		bottom: 11px;
		/* background-color: red;
		border: 1px solid #09BB07; */
		
		background-size: 44rpx 44rpx;
		background-position:center center;
		background-repeat: no-repeat;
	}
	/* 左图标 */
	.left-icon {
		left: 24rpx;
	}
	/* 右图标 */
	.right-icon {
		right: 24rpx;
	}
	/* 右文本 */
	.right-text {
		width: 60rpx;
		font-size: 13px;
		color: #333333;
		text-align: right;
		line-height: 50rpx;
		overflow: hidden;
		right: 24rpx;
	}
</style>
