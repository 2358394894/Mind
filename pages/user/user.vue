<template>
	<view class="container">
		<view class="FixedNavBar" :class="[isFixedTop ? 'FixedNavBar-fixed' : 'FixedNavBar-hidden']">
			<view class="headBox">
				<view class="btn comeBack" @tap="backButton"></view>
				<view class="nickname">网友123</view>
			</view>
		</view>
		<view class="SlideNavBar">
			<view class="headBox">
				<view class="btn comeBack" @tap="backButton"></view>
			</view>
			<view class="user-info">
				<image class="avatar" src="../../static/logo.png"></image>
				<view class="nickname">我不Carry谁Carry</view>
				<view>没有签名没有签名没有签名哦....</view>
				<view class="bottomMsg">
					<view class="Focus">
						<text>12</text>
						<text>订阅</text>
					</view>
					<view class="middleLine"></view>
					<view class="fans">
						<text>166</text>
						<text>粉丝</text>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<!-- 标签栏 -->
			<view class="titles" :class="[isFixedTop ? 'titles-fixed' : '']">
				<text :class="[tagIndex === 0 ? 'tag-active' : '']" @tap="tagIndex === 0 ? 'return' : tagIndex = 0">创作 23<text  :class="[tagIndex === 0 ? 'hemline firstline' : '']"></text></text>
				<text :class="[tagIndex === 1 ? 'tag-active' : '']" @tap="tagIndex === 1 ? 'return' : tagIndex = 1">喜欢的 16<text  :class="[tagIndex === 1 ? 'hemline' : '']"></text></text>
			</view>
			<!-- 占位盒子 -->
			<view style="width: 750rpx; height: 68rpx;" :style="{display: isFixedTop ? 'block' : 'none'}"></view>
			<!-- 创作列表 -->
			<view class="text-list" v-if="tagIndex === 0">
				<view class="essay"
					v-for="(item,index) in Hotdata" :key="index" v-if="Hotdata.length > 0">
					<image @tap="openDetail" class="coverImg" src="../../static/testCover.png"></image>
					<view @tap="openDetail" class="textBox">
						<view class="textContent">
							<text>靠近我  唤醒我\n</text>
							<text>包容着我  再深陷我\n</text>
							<text>记得我  牵挂我\n</text>
							<text>迷恋着我  再遗落我\n\n</text>
							<text>—— 冷{{item}} ——</text>
						</view>
					</view>
					<view class="private">
						<view class="lock"></view>
					</view>
				</view>
				<view class='noCard' v-if="Hotdata.length===0">
					暂无信息
				</view>
			</view>
			<!-- 喜欢列表 -->
			<view class="like-list" v-if="tagIndex === 1">
				
				<view class="essay"
					v-for="(item,index) in Hotdata" :key="index" v-if="Hotdata.length > 0">
					<image @tap="openDetail" class="coverImg" src="../../static/testCover.png"></image>
					<view @tap="openDetail" class="textBox">
						<view class="textContent">
							<text>靠近我  唤醒我\n</text>
							<text>包容着我  再深陷我\n</text>
							<text>记得我  牵挂我\n</text>
							<text>迷恋着我  再遗落我\n\n</text>
							<text>—— 冷{{item}} ——</text>
						</view>
					</view>
					<view class="info">
						<view class="author" @tap="userCenter">
							<image class="headPic" src="../../static/csyong.jpg"></image>
							<view class="userInfo">
								<text class="nickname">绿色汛期</text>
								<text>14:26</text>
							</view>
							
						</view>
						<view class="operate">
							<view class="btn"><text class="praise like"></text><text>1366</text></view>
							<view class="btn" @tap="openComment"><text class="comment"></text><text>13</text></view>
							<view class="btn" @tap='openShare'><text class="share"></text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订阅按钮 -->
			<view class="dyBtn">+&ensp;订阅</view>
			<!-- 分享模块 -->
			<share :shareType="shareType" v-on:tapHideShare="exitShare"></share>
		</view>
	</view>
</template>

<script>
	import share from '../../components/share-module/share-module.vue';
	export default {
		components: {
			share
		},
		// props: {
		// 	statusColor:{
		// 		type:String,
		// 		default:"#FFFFFF"
		// 	},
		// },
		data() {
			return {
				tagIndex: 0,	// 顶部标签
				Hotdata: [11, 22, 33], // 热门数据
				Hotpages: 1,		// 热门数据页数
				shareType: false,	// 分享层显示隐藏
				
				statusBarHeight: 0, // 状态栏的高度
				navbarInitTop: 0,	// 导航栏初始化距顶部的距离
				isFixedTop: false,	// 是否固定顶部
			}
		},
		/* 生命周期函数--监听页面加载 */
		onLoad: function () {
			var _this = this;
			
			// 获取设备信息
			uni.getSystemInfo({
				success(res) {
					_this.statusBarHeight = res.statusBarHeight; //状态栏的高度	
				}
			})
		},
		/* 生命周期函数--监听页面显示 */
		onShow: function() {
			var that = this;
			
			if (that.navbarInitTop === 0) {
				// 获取节点距离顶部的距离
				uni.createSelectorQuery().select('.titles').boundingClientRect(function (res) {
					if (res && res.top > 0) {
						// console.log(res);
						var navbarTop = parseInt(res.top);
						that.navbarInitTop = navbarTop;
					}
				}).exec();
			}
		},
		/* 监听页面滑动事件 */
		onPageScroll: function (e) {
			var that = this;
			var scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度
			
			// 判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
			var isSatisfy = scrollTop >= (that.navbarInitTop - that.statusBarHeight - 44) ? true : false;
			// 为了防止不停的setData, 这里做了一个等式判断。只有处于吸顶的临界值才会不相等
			if (that.isFixedTop === isSatisfy) {
				return false;
			}
			
			that.isFixedTop = isSatisfy;
		},
		/* 页面上拉触底事件的处理函数 */
		onReachBottom: function (e) {
			console.log(e)
		},
		methods: {
			// 设置页
			openSetting: function () {
				uni.navigateTo({
					url: '/pages/user/setting',
				})
			},
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
			// 回到上一页
			backButton: function() {
				// uni.navigateBack({ delta: 1 })
				uni.navigateBack();
			},
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
		
		/* 导航栏公共样式 */
		.SlideNavBar, .FixedNavBar {
			width: 750rpx;
			
			.headBox {
				width: 750rpx;
				height: 44px;
				box-sizing: border-box;
				padding: 0 24rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
			}
			.nickname {
				font-size: 15px;
				color: #000000;
			}
			.btn {
				width: 60rpx;
				height: 60rpx;
				background-size: cover;
				background-size: 36rpx 36rpx;
				background-position:center center;
				background-repeat: no-repeat;
			}
			.comeBack {
				background-image: url(../../static/images/user_left.png);
			}
		}
	}
	
	/* 滑动导航栏 */
	.SlideNavBar {
		height: auto;
		background-size: cover;
		background-image: url(../../static/user-bg.jpg);
		// box-sizing: border-box;
		padding-top: calc(var(--status-bar-height));
		
		.headBox {
			justify-content: space-between;
		}
		
		.user-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 322rpx;
			font-size: 11px;
			line-height: 15px;
			color: #CCCCCC;
			
			.avatar {
				min-width: 120rpx;
				min-height: 120rpx;
				max-width: 120rpx;
				max-height: 120rpx;
				border-radius: 50%;
				box-sizing: border-box;
				border: 1px solid #FFFFFF;
				display: block;
			}
			
			.nickname {
				color: #FFFFFF;
				padding: 24rpx 0;
			}
			
			.bottomMsg {
				display: flex;
				margin-top: 24rpx;
				
				.Focus, .fans {
					display: flex;
					flex-direction: column;
					text-align: center;
				}
				
				.middleLine {
					width: 1px;
					height: 30rpx;
					background-color: #CCCCCC;
					margin: 14rpx 60rpx;
				}
			}
		}
	}
	
	/* 固定导航栏 */
	.FixedNavBar-fixed {
		display: block;
	}
	.FixedNavBar-hidden {
		display: none;
	}
	.FixedNavBar {
		// display: none;
		position: fixed;
		top: 0;
		z-index: 999;
		height: calc(var(--status-bar-height) + 44px);
		background-color: #FFFFFF;
		
		.headBox {
			position: fixed;
			top: var(--status-bar-height);
			// z-index: 999;
			position: relative;
			
			.comeBack {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 24rpx;
			}
			.nickname {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
	
	.main {
		flex: 1;
		width: 750rpx;
		
		/* 标签栏 */
		.titles-fixed {
			position: fixed;
			top: calc(var(--status-bar-height) + 44px);
			z-index: 100;
		}
		.titles {
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			width: 100%;
			height: 68rpx;
			background-color: #FFFFFF;
			
			font-size: 26rpx;
			color: #999999;
			
			.tag-active {
				color: #000000;
				position: relative;
			}
			
			.hemline {
				position: absolute;
				left: 50%;
				bottom: 0;
				/* transform: translate(-50%, 12rpx); */
				transform: translate(-50%, -6rpx);
				width: 126rpx;
				height: 3px;
				display: block;
				/* background-color: #0A4025; */
				background-color: rgba(10, 64, 37, .6);
			}
			.firstline {
				width: 100rpx;
			}
		}
		
		/* 列表模块公共样式 */
		.text-list, .like-list {
			// padding-top: calc(var(--status-bar-height) + 44px + 68rpx); /* 预留顶部标签栏位置 */
			padding-bottom: 100rpx;
			display: flex;
			flex-direction: column;
			color: #666666;
			background-color: #EBEBEB;
		}
	}
	
	/* 文章 */
	.essay {
		height: 990rpx;
		margin-bottom: 8px;
		background-color: #FFFFFF;
		
		.coverImg {
			width: 100%;
			height: 500rpx; /* 250px */
			display: block;
		}
		/* 文字内容 */
		.textBox {
			width: 100%;
			height: 400rpx;
			position: relative;
			
			.textContent {
				max-height: 340rpx;
				padding: 20rpx 0;
				font-size: 13px;
				color: #333333;
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
		}
		
		/* 用户信息模块 */
		.info, .private {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 88rpx;
			border-top: 1px solid #EBEBEB;
		}
		/* 不公开(锁定) */
		.private {
			justify-content: flex-end;
			align-items: flex-end;
			border: 0;
			
			.lock {
				width: 28rpx;
				height: 30rpx;
				margin: 0 24rpx 14rpx 0;
				background-size: cover;
				background-image: url(../../static/images/lock.png);
			}
		}
		/* 公开(用户信息) */
		.info {
			.author, .operate text {
				font-size: 11px;
				color: #999999;
			}
			/* 用户信息 */
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
				.userInfo {
					padding: 18rpx 20rpx 12rpx 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.nickname {
					font-size: 13px;
					color: #333333;
				}
			}
			/* 操作栏 */
			.operate {
				display: flex;
				height: 88rpx;
				font-size: 14px;
				
				.btn {
					height: 88rpx;
					margin-right: 4rpx;
					padding: 0 10rpx;
					display: flex;
					align-items: center;
				}
				
				.praise, .comment, .share{
					display: block;
					background-size: cover;
				}
				
				.praise {
					width: 24rpx;
					height: 22rpx;
					margin-right: 8rpx;
					background-image: url(../../static/images/info_praise.png);
				}
				/* .like {
					background-image: url(../../static/images/info_praise_l.png);
				} */
				.comment {
					width: 24rpx;
					height: 24rpx;
					margin-right: 8rpx;
					background-image: url(../../static/images/info_comment.png);
				}
				.share {
					width: 26rpx;
					height: 26rpx;
					background-image: url(../../static/images/info_share.png);
				}
			}
		}
	}
	
	/* 订阅按钮 */
	.dyBtn {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background-color: #0A4025;
		font-size: 18px;
		font-weight: normal;
		color: #FFFFFF;
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
