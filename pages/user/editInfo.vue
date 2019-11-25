<template>
	<view class="container">
		<bar :nav="setNav"></bar>
		<view class="main">
			<view class="type-list">
				<view class="left">
					<text>头像</text>
				</view>
				<view class="right">
					<image class="headPic" src="../../static/user-bg.jpg"></image>
					<view class="right-icon"></view>
				</view>
			</view>
			<view class="type-list" @tap="modifyName">
				<view class="left">
					<text>昵称</text>
				</view>
				<view class="right">
					<view class="nickname">网友123</view>
					<view class="right-icon"></view>
				</view>
			</view>
			<view class="Signature">
				<view class="left">
					<text>个性签名</text>
				</view>
				<view class="right">
					<textarea class="multiline" value="" placeholder="输入内容成为您的签名..." placeholder-style="color: #CCCCCC; font-size: 13px;" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bar from '../../components/bar/bar.vue';
	export default {
		components:{
			bar
		},
		data(){
			return{
				// 自定义导航栏对象
				setNav:{
					'bg':'#FFFFFF',		// 背景色
					'navTitle': '编辑资料',	// 导航标题
					'borderStyle': '0px', // 导航底边样式 '1px solid #FFB400'
					'leftIcon': 'url(../../static/images/nav_left.png)',	// 左图标
					// 'rightIcon': 'url(../../static/images/nav_right.png)',	// 右图标
					'rightText': '保存',	 // 右文本
					'isdisPlayNavTitle': true,	// 是否显示返回按钮
					'isRightType': 2,			// 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				},
			}
		},
		methods: {
			// 修改昵称
			modifyName: function(e) {
				uni.navigateTo({
					url: '/pages/user/editNickname',
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		overflow: auto;
		background-color: #F3F3F3;
		font-size: 15px;
	}
	.main {
		width: 750rpx;
		height: 100%;
	}
	
	.type-list, .Signature {
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		background-color: #FFFFFF;
		border-bottom: 1px solid #EBEBEB;
		font-size: 15px;
		color: #333333;
		box-sizing: border-box;
		padding: 0 8rpx 0 24rpx;
	}
	
	.type-list {
		height: 88rpx;
		
		.left {
			display: flex;
			align-items: center;
			height: 88rpx;
		}
		
		.right {
			display: flex;
			align-items: center;
			
			.headPic {
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;
			}
			
			.nickname {
				color: #CCCCCC;
			}
			
			.right-icon {
				width: 32rpx;
				height: 32rpx;
				margin-left: 20rpx;
				background-size: cover;
				background-image: url(../../static/images/message_right.png);
			}
		}
	}
	
	.Signature {
		height: 200rpx;
		
		.left {
			display: flex;
			height: 200rpx;
			box-sizing: border-box;
			padding-top: 29rpx;
			
			text {
				width: 120rpx;
				display: block;
			}
		}
		
		.right {
			.multiline {
				height: 200rpx;
				box-sizing: border-box;
				padding: 32rpx 30rpx 0 30rpx;
			}
		}
	}
</style>
