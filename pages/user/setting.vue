<template>
	<view class="container">
		<bar :nav="setNav"></bar>
		<view class="main">
			<view class="type-list" @tap="modifyUserInfo">
				<view class="left">
					<text>修改用户资料</text>
				</view>
				<view class="right">
					<view class="right-icon"></view>
				</view>
			</view>
			<view class="type-list" @tap="modifyPw">
				<view class="left">
					<text>修改密码</text>
				</view>
				<view class="right">
					<view class="right-icon"></view>
				</view>
			</view>
			<view class="type-list">
				<view class="left">
					<text>意见反馈</text>
				</view>
				<view class="right">
					<view class="right-icon"></view>
				</view>
			</view>
			<view class="type-list">
				<view class="left">
					<text>关于</text>
				</view>
				<view class="right">
					<view class="right-icon"></view>
				</view>
			</view>
			<view class="type-list">
				<view class="left">
					<text>给 心文 好评</text>
				</view>
				<view class="right">
					<view class="right-icon"></view>
				</view>
			</view>
			<view class="type-list">
				<view class="left">
					<text>退出登录</text>
				</view>
				<view class="right">
					<view class="right-icon"></view>
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
					'navTitle': '设置',	// 导航标题
					'borderStyle': '0px', // 导航底边样式 '1px solid #FFB400'
					'leftIcon': 'url(../../static/images/nav_left.png)',	// 左图标
					// 'rightIcon': 'url(../../static/images/nav_right.png)',	// 右图标
					// 'rightText': '发布',										// 右文本
					'isdisPlayNavTitle': true,	// 是否显示返回按钮
					'isRightType': 0,			// 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				},
			}
		},
		methods: {
			modifyUserInfo: function(e) {
				uni.navigateTo({
					url: '/pages/user/editInfo',
				})
			},
			modifyPw: function(e) {
				
			}
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

	.type-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		height: 88rpx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #EBEBEB;
		font-size: 15px;
		color: #333333;
		box-sizing: border-box;
		padding: 0 8rpx 0 24rpx;
		
		.left {
			display: flex;
			align-items: center;
			height: 88rpx;
		}
		
		.right {
			display: flex;
			align-items: center;
			
			.right-icon {
				width: 32rpx;
				height: 32rpx;
				background-size: cover;
				background-image: url(../../static/images/message_right.png);
			}
		}
	}
</style>
