<template>
	<view class="container">
		<view class="title-contents">
			<view class="top-view status" :style="{background: statusColor}"> </view>
			<view class="searchBox" :style="{background: statusColor}">
				<view class="searchIcon"></view>
				<input class="inputBox" type="text" value="" placeholder="输入你想寻找的..." placeholder-style="color: #999999;"/>
				<view class="cancel" @tap="backButton">取消</view>
			</view>
		</view>
		<view class="main">
			<view class="searchContent">
				<view class="titles">
					<text :class="[tagIndex === 0 ? 'tag-active' : '']" @tap="tagIndex === 0 ? 'return' : tagIndex = 0">文字<text  :class="[tagIndex === 0 ? 'hemline' : '']"></text></text>
					<text :class="[tagIndex === 1 ? 'tag-active' : '']" @tap="tagIndex === 1 ? 'return' : tagIndex = 1">用户<text  :class="[tagIndex === 1 ? 'hemline' : '']"></text></text>
				</view>
				<!-- 文字列表 -->
				<view class="text-list" v-if="tagIndex === 0">
					<view class="essay" style="height: 990rpx; margin-bottom: 8px;"
						v-for="(item,index) in Hotdata" :key="index" v-if="Hotdata.length > 0">
						<image @tap="openDetail" class="coverImg" src="../../static/testCover.png"></image>
						<view @tap="openDetail" class="textBox">
							<view class="textContent">
								<text>靠近我  唤醒我\n</text>
								<text>包容着我  再深陷我\n</text>
								<text>记得我  牵挂我\n</text>
								<!-- <text>记得我  牵挂我\n</text> -->
								<text>迷恋着我  再遗落我\n\n</text>
								<text>—— 冷{{item}} ——</text>
								<!-- <text>靠近我  唤醒我\n</text>
								<text>包容着我  再深陷我\n</text>
								<text>记得我  牵挂我\n</text>
								<text>迷恋着我  再遗落我\n\n</text>
								<text>—— 冷{{item}} ——</text> -->
							</view>
						</view>
						<view class="info">
							<view class="author">
								<image class="headPic" src="../../static/csyong.jpg"></image>
								<view class="nickname" @tap="userCenter">
									<text>绿色汛期</text>
									<text class="time">14:26</text>
								</view>
							</view>
							<view class="operate">
								<view class="btn praise like"><text></text><text>1366</text></view>
								<view class="btn comment" @tap="openComment"><text></text><text>13</text></view>
								<view class="btn share" @tap='openShare'><text></text></view>
							</view>
						</view>
					</view>
					<view class='noCard' v-if="Hotdata.length===0">
						暂无信息
					</view>
				</view>
				<view class="user-list" v-if="tagIndex === 1">
					<block v-for="(item,index) in Hotdata" :key="index" v-if="Hotdata.length > 0">
						<view class="user-list-item" @tap="userCenter">
							<view class="user-info">
								<image src="../../static/csyong.jpg"></image>
								<text>网友</text>
							</view>
							<view class="creation">
								创作  32
							</view>
						</view>
					</block>
					<view class='noCard' v-if="Hotdata.length===0">
						暂无信息
					</view>
				</view>
				<!-- 分享模块 -->
				<share :shareType="shareType" v-on:tapHideShare="exitShare"></share>
			</view>
		</view>
	</view>
</template>

<script>
	import share from '../../components/share-module/share-module.vue';
	export default {
		components: {
			share
		},
		props: {
			statusColor:{
				type:String,
				default:"#FFFFFF"
			},
		},
		data() {
			return {
				tagIndex: 0,	// 顶部标签
				Hotdata: [11, 22, 33], // 热门数据
				Hotpages: 1,		// 热门数据页数
				shareType: false,
			}
		},
		onLoad() {},
		// 页面上拉触底事件的处理函数
		onReachBottom: function (e) {
			console.log(e)
		},
		methods: {
			// 详情页
			openDetail: function(e) {
				uni.navigateTo({
					url: '/pages/detail/detail',
				})
			},
			// 用户中心
			userCenter: function () {
				uni.navigateTo({
					url: '/pages/user/user',
				})
			},
			// 打开评论页
			openComment: function (e) {
				uni.navigateTo({
					url: '/pages/commentList/commentList',
				})
			},
			// 显示分享
			openShare: function (e) {
				this.shareType = true;
				console.log('显示')
			},
			// 退出分享
			exitShare: function (e) {
				this.shareType = false;
			},
			// 页面返回
			backButton: function () {
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
	.searchBox {
		width: 100%;
		height: 44px;
		line-height: 44px;
		overflow: hidden;
		position: fixed;
		top: var(--status-bar-height);
		z-index: 999;
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.inputBox {
			width: 630rpx;
			height: 66rpx;
			box-sizing: border-box;
			background: $inp-bg-color;
			border-radius: 8rpx;
			margin-right: 14rpx;
			padding-left: 65rpx;
			position: relative;
		}
		
		.searchIcon {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			left: 42rpx;
			top: 32rpx;
			z-index: 100;
			background-size: cover;
			background-image: url(../../static/images/nav_search.png);
			background-repeat: no-repeat;
		}
	}
	
	.main {
		flex: 1;
		width: 750rpx;
	}
	
	.searchContent {
		/* 标签栏 */
		.titles {
			position: fixed;
			top: calc(var(--status-bar-height) + 44px);
			z-index: 999;
			
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			width: 100%;
			height: 76rpx;
			background-color: #FFFFFF;
			
			font-size: 24rpx;
			color: #999999;
			
			.tag-active {
				color: #000000;
				position: relative;
			}
			
			.hemline {
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translate(-50%, 12rpx);
				width: 28rpx;
				height: 2px;
				display: block;
				background-color: #000000;
			}
		}
	}
	
	/* 列表 */
	.text-list, .user-list {
		padding-top: 76rpx; /* 预留顶部标签栏位置 */
		padding-bottom: 100rpx;
		display: flex;
		flex-direction: column;
		color: #666666;
		background-color: #EBEBEB;
	}
	
	/* 用户列表 */
	.user-list {
		// background-color: #FFFFFF;
		.user-list-item {
			height: 76rpx;
			margin-bottom: 13rpx;
			padding: 0 22rpx 0 20rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #F7F7F7;
			color: #333333;
			background-color: #FFFFFF;
			
			display: flex;
			justify-content: space-between;
			
			.user-info {
				display: flex;
				align-items: center;
				image {
					width: 62rpx;
					height: 62rpx;
					border-radius: 50%;
					margin-right: 22rpx;
				}
			}
			.creation {
				font-size: 11px;
				line-height: 76rpx;
			}
		}
	}
	
	/* 文章 */
	.essay {}
	.essay .coverImg {
		width: 100%;
		height: 500rpx; /* 250px */
		display: block;
	}
	/* 文字内容 */
	.essay .textBox {
		width: 100%;
		height: 400rpx;
		background-color: #FFFFFF;
		// border-bottom: 1px solid #EBEBEB;
		position: relative;
	}
	.essay .textBox .textContent {
		max-height: 340rpx;
		padding: 20rpx 0;
		font-size: 13px;
		color: #333333;
		// background-color: pink;
		border: 1px solid pink;
		text-align: center;
		line-height: 27.5px;
		
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
		
		// writing-mode:tb-rl; /*IE浏览器*/
		// height: 340rpx;
		// writing-mode:vertical-rl;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.essay .textBox .textContent text {
		// writing-mode:tb-rl;
		background-color: #EBEBEB;
	}
	/* 用户信息模块 */
	.essay .info {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 88rpx;
		background-color: #FFFFFF;
		border-top: 1px solid #EBEBEB;
		
		.author {
			height: 88rpx;
			line-height: 14px;
			display: flex;
			
			.headPic{
				width: 62rpx;
				height: 62rpx;
				border-radius: 50%;
				margin: 13rpx 21rpx 0 24rpx;
			}
			
			.nickname{
				font-size: 13px;
				color: #333333;
				padding: 18rpx 20rpx 12rpx 0;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				
				.time {
					font-size: 11px;
					color: #999999;
				}
			}
		}
		
		/* 操作栏 */
		.operate {
			display: flex;
			width: auto;
			height: 88rpx;
			font-size: 14px;
			
			.btn {
				width: auto;
				height: 88rpx;
				margin-right: 4rpx;
				padding: 0 10rpx;
				font-size: 11px;
				color: #999999;
				display: flex;
				align-items: center;
			}
			
			.praise text:nth-child(1),
			.comment text:nth-child(1),
			.share  text:nth-child(1){
				display: block;
				background-size: cover;
			}
			.praise text:nth-child(1) {
				width: 24rpx;
				height: 22rpx;
				margin-right: 8rpx;
				background-image: url(../../static/images/info_praise.png);
			}
			/* .like text:nth-child(1) {
				background-image: url(../../static/images/info_praise_l.png);
			} */
			.comment text:nth-child(1) {
				width: 24rpx;
				height: 24rpx;
				margin-right: 8rpx;
				background-image: url(../../static/images/info_comment.png);
			}
			.share text:nth-child(1) {
				width: 26rpx;
				height: 26rpx;
				background-image: url(../../static/images/info_share.png);
			}
		}
	}
	
	/* 无内容 */
	.noCard {
		width: 90%;
		height: 200rpx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		color: #999999;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
	}
</style>
