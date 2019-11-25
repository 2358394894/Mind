<template>
	<view class="outerLayer" v-if="shareType">
		<view class="nvMask" @tap="exitShare"></view>
		<view class="nvImageMenu">
			<!-- <view class="title">分享</view> -->
			<view class="iconList">
				<image class="iconItem" @tap="shareWay(0)" src="../../static/images/share_wxF.png"></image>
				<image class="iconItem" @tap="shareWay(1)" src="../../static/images/share_wxM.png"></image>
				<image class="iconItem" @tap="shareWay(2)" src="../../static/images/share_qq.png"></image>
				<image class="iconItem" @tap="shareWay(3)" src="../../static/images/share_wb.png"></image>
			</view>
			<view class="cancel" @tap="exitShare">取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["shareType"],
		data() {
			return {

			};
		},
		methods: {
			exitShare: function () {
				this.$emit("tapHideShare")
			}
		},
	}
</script>

<style lang="scss" scoped>
	/* app分享框 */
	.outerLayer {
		position: fixed;
		top: 0px;
		left: 0px;
		height: 100%;
		width: 100%;
		z-index: 9999;
	}
	.nvMask {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.nvImageMenu {
		position: absolute;
		bottom: 0px;
		left: 0px;
		height: auto;
		width: 100%;
		background-color: rgb(255, 255, 255);
		border-radius: 14rpx 14rpx 0 0;
		flex-wrap: wrap;
	}
	/* 图标 */
	.nvImageMenu .iconList {
		padding: 40rpx 74rpx;
		display: flex;
		justify-content: space-between;
		
	}
	.nvImageMenu .iconList .iconItem {
		width: 78rpx;
		height: 78rpx;
	}
	.cancel {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 15px;
		color: #333333;
		border-top: 3px solid #EDEDED;
	}
</style>
