<template>
	<view class="container">
		<bar :nav="setNav" v-on:tapRightButton="rightButton"></bar>
		<view class="main">
			<image class="coverPic" src="../../static/testpic2.png"></image>
			<scroll-view class="textBox" style="height: 430rpx;" scroll-y="true">
				<view class="textContent">
					<text>靠近我  唤醒我\n</text>
					<text>包容着我  再深陷我\n</text>
					<text>记得我  牵挂我\n</text>
					<text>迷恋着我  再遗落我\n\n</text>
					<text>—— 冷 ——</text>
				</view>
			</scroll-view>
			<view class="info">
				<view class="author" @tap="userCenter" :data-uid="dataList.createdUserId">
					<image class="headPic" src="../../static/csyong.jpg"></image>
					<view class="nickname">
						<text>绿色汛期</text>
						<text class="time">{{getDateDiff(dataList.createdTime)}}</text>
					</view>
				</view>
				<view class="operate">
					<view class="btn praise like"><text></text><text>{{dataList.articleLikeNum}}</text></view>
					<view class="btn comment" @tap="comment"><text></text><text>{{dataList.articleCommentNum}}</text></view>
					<view class="btn share" @tap="openShare"><text></text></view>
				</view>
			</view>
		</view>
		
		<!-- app分享模态框 -->
		<!-- #ifdef APP-PLUS -->
		<view class="outerLayer" v-if="layer">
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
		<!-- #endif -->
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
					'navTitle': '详情',	// 导航标题
					'leftIcon': 'url(../../static/images/nav_left.png)',	// 左图标
					'rightIcon': 'url(../../static/images/nav_more.png)',	// 右图标
					'rightText': '发布',										// 右文本
					'isdisPlayNavTitle': true,	// 是否显示返回按钮
					'isRightType': 1,			// 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				},
				layer: false, // 分享层
				dataList: new Object(), // {}
			}
		},
		onLoad: function (options) {
			// options可以接收父页面(index) 传过来的值
			var lid = options.lid;
			
			let that = this;
			// 显示 loading 提示框
			uni.showLoading({
				title: 'loading...'
			})
			this.$axios.request({
				url: '/login/selectArticleById',
				method: 'post',
				data: {
					"articleId": lid
				}
			}).then(function(res) {
				that.dataList = res.data.data;
				console.log(that.dataList)
				uni.hideLoading()
			})
		},
		methods: {
			rightButton: function (e) {
				// console.log(e) //子组件传递的参数
				uni.showActionSheet({
					// itemList: ['复制文字', '举报', '取消'],
					itemList: ['复制文字', '举报'],
					success: function (res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (res.tapIndex === 1) {
							uni.showActionSheet({
								// itemList: ['违法有害信息', '垃圾广告', '色情低俗', '取消'],
								itemList: ['违法有害信息', '垃圾广告', '色情低俗'],
								success: function (res) {
									console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
								}
							});
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			// #ifdef APP-PLUS
			openShare: function () {
				console.log('分享');
				this.layer = true;
			},
			exitShare: function() { // 退出分享
				this.layer = false;
			},
			// #endif
			// 用户中心
			userCenter: function(e) {
				var userId = e.currentTarget.dataset.uid;
				uni.navigateTo({
					url: '/pages/user/user?uld='+userId
				})
			},
			comment: function () {
				uni.navigateTo({
					url: '/pages/commentList/commentList',
				})
			}
		},
		computed: {
			// 时间区间判断
			getDateDiff() {
				return function (timeStamp) {
					var minute = 1000 * 60;
					var hour = minute * 60;
					var day = hour * 24;
					var halfamonth = day * 15;
					var month = day * 30;
					var now = new Date().getTime();
					var diffValue = now - timeStamp;
					if(diffValue < 0){return;}
					var monthC =diffValue/month;
					var weekC =diffValue/(7*day);
					var dayC =diffValue/day;
					var hourC =diffValue/hour;
					var minC =diffValue/minute;
					var result = '';
					if(monthC>=1){
						result="" + parseInt(monthC) + "个月前";
					}
					else if(weekC>=1){
						result="" + parseInt(weekC) + "周前";
					}
					else if(dayC>=1){
						result=""+ parseInt(dayC) +"天前";
					}
					else if(hourC>=1){
						result=""+ parseInt(hourC) +"小时前";
					}
					else if(minC>=1){
						result=""+ parseInt(minC) +"分钟前";
					}else {
						result="刚刚";
					}
					return result;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #FFFFFF;
		font-size: 15px;
	}
	.main {
		width: 100%;
		height: 100%;
		border-top: 1px solid #EDEDED;
		
		.coverPic {
			width: 100%;
			height: 678rpx;
			display: block;
		}
		
		.textBox {
			// height: 430rpx;
			// overflow: hidden;
			position: relative;
		}
		
		.textContent {
			margin: 0 auto;
			padding-top: 55rpx;
			font-size: 13px;
			color: #333333;
			text-align: center;
			line-height: 27.5px;
			
			/* 横向排版 */
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 12; /* 超出12行时，隐藏并显示省略符 */
			-webkit-box-orient: vertical;
			
			/* 竖向排版 */
			// writing-mode:tb-rl; /*IE浏览器*/
			// padding-top: 80rpx;
			// writing-mode:vertical-rl;
			
			text {
				background-color: #EBEBEB;
			}
		}
	}
	
	/* 底部信息模块 */
	.info {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 88rpx;
		box-shadow: 0 -1px 10px rgba(10, 64, 37, 0.2);
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
		
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
	
	/* #ifdef APP-PLUS */
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
		color: #333333;
		border-top: 3px solid #EDEDED;
	}
	/* #endif */
</style>
