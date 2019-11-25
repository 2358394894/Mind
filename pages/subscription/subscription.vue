<template>
	<view class="container">
		<bar :nav="setNav" v-on:tapRightButton="rightButton"></bar>
		<view class="main" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
			<!-- 刷新事件isRefresh需要异步操作返回resolve -->
			<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
			<!-- 列表 -->
			<view class="list">
				<view class="essay" style="height: 990rpx; margin-bottom: 8px;"
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
						<view class="author">
							<image class="headPic" src="../../static/csyong.jpg"></image>
							<view class="nickname">
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
			<!-- 分享模块 -->
			<share :shareType="shareType" v-on:tapHideShare="exitShare"></share>
		</view>
	</view>
</template>

<script>
	import bar from '../../components/bar/bar.vue';
	import refresh from '../../components/refresh/refresh.vue';
	import share from '../../components/share-module/share-module.vue';
	export default {
	    components:{
			bar,
			refresh,
			share
		},
		data(){
			return{
				// 自定义导航栏对象
				setNav:{
					'bg':'#FFFFFF',		// 背景色
					'navTitle': '订阅',	// 导航标题
					'borderStyle': '0px', // 导航底边样式 '1px solid #FFB400'
					// 'leftIcon': 'url(../../static/images/nav_left.png)',	// 左图标
					'rightIcon': 'url(../../static/images/nav_search.png)',	// 右图标
					// 'rightText': '发布',										// 右文本
					'isdisPlayNavTitle': false,	// 是否显示返回按钮
					'isRightType': 1,			// 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				},
				Hotdata: [11, 22, 33], // 列表数据
				shareType: false,
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function (e) {
			console.log(e)
		},
		methods: {
			rightButton: function (e) {
				uni.navigateTo({
					url: '/pages/subscription/search',
				})
			},
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e){
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh(){
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						mask: true, // 显示透明蒙层，防止触摸穿透
						title: '刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
			},
			// 详情页
			openDetail: function(e) {
				uni.navigateTo({
					url: '/pages/detail/detail',
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
	
	/* 列表 */
	.list {
		padding-bottom: 100rpx;
		display: flex;
		flex-direction: column;
		color: #666666;
		background-color: #EBEBEB;
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
	.info {
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
