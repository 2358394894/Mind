<template>
	<view class="container">
		<bar :nav="setNav"></bar>
		<view class="main">
			<view class="type-list" @tap="openLike">
				<view class="left">
					<view class="icons zan-icon"></view>
					<text>赞</text>
				</view>
				<view class="right">
					<view class="num">18</view>
					<view class="right-icon"></view>
				</view>
			</view>
			<view class="type-list comment" @tap="openComment">
				<view class="left">
					<view class="icons comment-icon"></view>
					<text>评论</text>
				</view>
				<view class="right">
					<view class="num">23</view>
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
					'navTitle': '消息',	// 导航标题
					'borderStyle': '0px', // 导航底边样式 '1px solid #FFB400'
					'isdisPlayNavTitle': false, // 是否显示返回按钮
					'isRightType': 0, // 右侧标签显示类型 0不显示 1图标 2文本
				}
			}
		},
		methods: {
			openLike: function(e) {
				uni.navigateTo({
					url: '/pages/message/likes',
				})
			},
			openComment: function(e) {
				uni.navigateTo({
					url: '/pages/message/userComment',
				})
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
	.main {
		width: 750rpx;
		height: 100%;
	}
	
	.comment {
		border-top: 1px solid #EBEBEB;
	}
	.type-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		height: 88rpx;
		font-size: 15px;
		color: #333333;
		box-sizing: border-box;
		padding: 0 8rpx 0 24rpx;
		
		.left {
			display: flex;
			align-items: center;
			height: 88rpx;
			
			.icons {
				margin-right: 13rpx;
				background-size: cover;
			}
			.zan-icon {
				width: 34rpx;
				height: 32rpx;
				background-image: url(../../static/images/info_praise.png);
			}
			.comment-icon {
				width: 30rpx;
				height: 30rpx;
				background-image: url(../../static/images/info_comment.png);
			}
		}
		
		.right {
			display: flex;
			align-items: center;
			
			.num {
				width: 36rpx;
				height: 36rpx;
				line-height: 36rpx;
				text-align: center;
				border-radius: 50%;
				background-color: #CC2121;
				margin-right: 12rpx;
				font-size: 11px;
				color: #FFFFFF;
			}
			
			.right-icon {
				width: 32rpx;
				height: 32rpx;
				background-size: cover;
				background-image: url(../../static/images/message_right.png);
			}
		}
	}
</style>
