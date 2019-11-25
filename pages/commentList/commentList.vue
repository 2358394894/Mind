<template>
	<view class="container">
		<bar :nav="setNav"></bar>
		<view class="main" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
			<!-- 刷新事件isRefresh需要异步操作返回resolve -->
			<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
			<!-- 评论区 start -->
			<view class="comment">
				<view class="comment-list">
					<view class="comment-face">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"></image>
					</view>
					<view class="comment-body">
						<view class="top-user-info">
							<view class="user-info">
								<text class="user-name">网友</text>
								<text class="comment-date">08:12</text>
							</view>
							<view class="comment-zan">
								<text>4616</text><view class="zan-icon"></view>
							</view>
						</view>
						<view class="comment-content">很酷的HBuilderX和app，开发一次既能生成小程序又能生成App很酷开发一次既能生成小程序，又能生成App很酷</view>
						<!-- 回复区 -->
						<view class="reply-list">
							<view class="reply-face">
								<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"></image>
							</view>
							<view class="comment-body">
								<view class="top-user-info">
									<view class="user-info">
										<text class="user-name">网友<text class="reply-user"> 回复 </text>网友</text>
										<text class="comment-date">08:12</text>
									</view>
									<view class="comment-zan">
										<text>4616</text><view class="zan-icon"></view>
									</view>
								</view>
								<view class="comment-content">很酷的HBuilderX和app，开发一次既能生成小程序又能生成App很酷开发一次既能生成小程序，又能生成App很酷</view>
								<view class="all">查看全部回复</view>
							</view>
						</view>
					</view>
				</view>
				<view class="comment-list comment-noborder">
					<view class="comment-face">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"></image>
					</view>
					<view class="comment-body">
						<view class="top-user-info">
							<view class="user-info">
								<text class="user-name">网友</text>
								<text class="comment-date">08:12</text>
							</view>
							<view class="comment-zan">
								<text>4616</text><view class="zan-icon"></view>
							</view>
						</view>
						<view class="comment-content">很酷的HBuilderX和app，开发一次既能生成小程序又能生成App很酷开发一次既能生成小程序，又能生成App很酷</view>
					</view>
				</view>
				<!-- 热门评论分割线 -->
				<view class="splitLine">
					<text></text>以上是热门评论<text></text>
				</view>
				<view class="comment-list">
					<view class="comment-face">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"></image>
					</view>
					<view class="comment-body">
						<view class="top-user-info">
							<view class="user-info">
								<text class="user-name">网友</text>
								<text class="comment-date">08:12</text>
							</view>
							<view class="comment-zan">
								<text>4616</text><view class="zan-icon"></view>
							</view>
						</view>
						<view class="comment-content">很酷的HBuilderX和app，开发一次既能生成小程序又能生成App很酷开发一次既能生成小程序，又能生成App很酷</view>
					</view>
				</view>
				
				<view class="comment-list">
					<view class="comment-face">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"></image>
					</view>
					<view class="comment-body">
						<view class="top-user-info">
							<view class="user-info">
								<text class="user-name">网友</text>
								<text class="comment-date">08:12</text>
							</view>
							<view class="comment-zan">
								<text>4616</text><view class="zan-icon"></view>
							</view>
						</view>
						<view class="comment-content">很酷的HBuilderX和app，开发一次既能生成小程序又能生成App很酷开发一次既能生成小程序，又能生成App很酷</view>
						<!-- 回复区 -->
						<view class="reply-list">
							<view class="reply-face">
								<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"></image>
							</view>
							<view class="comment-body">
								<view class="top-user-info">
									<view class="user-info">
										<text class="user-name">网友<text class="reply-user"> 回复 </text>网友</text>
										<text class="comment-date">08:12</text>
									</view>
									<view class="comment-zan">
										<text>4616</text><view class="zan-icon"></view>
									</view>
								</view>
								<view class="comment-content">很酷的HBuilderX和app，开发一次既能生成小程序又能生成App很酷开发一次既能生成小程序，又能生成App很酷</view>
								<view class="all">查看全部回复</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 文本框 -->
			<view class="inputBox">
				<textarea class="multiline" @focus="focusTextArea" @blur="bindTextArea" auto-height value="" placeholder="写点什么..." placeholder-style="color: #999999;" :class="[bindStyle ? 'bindBg' : '']" />
				<view class="submit" v-if="submitBtn">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bar from '../../components/bar/bar.vue';
	import refresh from '../../components/refresh/refresh.vue';
	export default {
	    components:{
			bar,
			refresh
		},
		data(){
			return{
				articleId: null,	// 文章Id
				pages: 1,			// 数据页数
				// 自定义导航栏对象
				setNav:{
					'bg':'#FFFFFF',		// 背景色
					'navTitle': '评论列表',	// 导航标题
					'leftIcon': 'url(../../static/images/nav_left.png)',	// 左图标
					// 'rightIcon': 'url(../../static/images/nav_right.png)',	// 右图标
					// 'rightText': '发布',										// 右文本
					'isdisPlayNavTitle': true,	// 是否显示返回按钮
					'isRightType': 0,			// 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				},
				bindStyle: false,
				submitBtn: false,
			}
		},
		onLoad: function (options) {
			// options可以接收父页面 传过来的值
			this.articleId = options.aId;
			this.getCommentData()
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function (e) {
			console.log(e)
		},
		methods: {
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
			// 获取所有评论数据
			getCommentData: function() {
				let that = this;
				// 显示 loading 提示框
				uni.showLoading({
					title: 'loading...'
				})
				this.$axios.request({
					url: '/articleComment/selectPageAppArticleByArticleId',
					method: 'post',
					data: {
						"articleId": that.articleId,
						"pageCount": 1,
						"pageSize": 10
					}
				}).then(function (res) {
					console.log(res.data.data.dataList);
					uni.hideLoading()
				})
			},
			// 输入框聚焦
			focusTextArea: function (e) {
				this.bindStyle = true;
			},
			// 输入框失去焦点
			bindTextArea: function (e) {
				// console.log(e.detail.value,"长度："+e.detail.value.length)
				var val = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
				// console.log(val)
				// 注释：indexOf() 方法对大小写敏感！
				// 注释：如果要检索的字符串值没有出现，则该方法返回 -1
				if (val != '' && val != null) {
					this.submitBtn = true;
				} else {
					this.bindStyle = false;
					this.submitBtn = false;
				}
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
	}
	.main {
		height: 100%;
		border-top: 1px solid #EDEDED;
	}
	
	.inputBox {
		width: 100vw;
		min-height: 88rpx;
		box-sizing: border-box;
		padding: 11rpx 0;
		background-color: #FFFFFF;
		border-top: 1px solid #F7F7F7;
		position: fixed;
		bottom: 0;
		
		.multiline {
			padding: 0px;
			margin: 0px;
			box-sizing: border-box;
			width: auto;
			min-height: 66rpx;
			margin: 0 20rpx;
			padding: 14rpx 26rpx;
			border-radius: 8rpx;
			background-color: #F3F3F3;
		}
		/* 文本框聚焦样式 */
		.bindBg {
			background-color: #FFFFFF;
		}
		/* 提交按钮 */
		.submit {
			width: 100%;
			height: 55rpx;
			line-height: 55rpx;
			text-align: right;
			color: #0A4025;
			padding-right: 21rpx;
			box-sizing: border-box;
			border-top: 1px solid #E8E8E8;
		}
	}
	
	/* 评论列表 */
	.comment {
		flex: 1;
		// padding: 0 20rpx 88rpx 20rpx;
		padding: 0 20rpx 88rpx 20rpx;
		display: flex;
		flex-direction: column;
		color: #666666;
	}

	.comment-list {
		box-sizing: border-box;
		padding: 12rpx 0 22rpx 0;
		width: 100%;
		display: flex;
		border-bottom: 1px solid #F0F0F0;
	}
	.comment-noborder {
		border: 0;
	}
	/* 热门评论分割线 */
	.splitLine {
		width: 100%;
		height: 60rpx;
		font-size: 11px;
		color: #999999;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		text {
			width: 35%;
			height: 1px;
			background-color: #F0F0F0;
		}
	}
	/* 头像 */
	.comment-face {
		margin-right: 21rpx;
		image {
			width: 62rpx;
			height: 62rpx;
			border-radius: 50%;
		}
	}
	/* 内容框 */
	.comment-body {
		// width: 100%;
		
		/* 用户信息栏 */
		.top-user-info {
			display: flex;
			justify-content: space-between;
			height: 62rpx;
			/* 用户信息 */
			.user-info {
				display: flex;
				flex-direction: column;
				line-height: 34rpx;
				.user-name {
					font-size: 13px;
				}
				.reply-user {
					color: #333333;
				}
				.comment-date {
					font-size: 9px;
				}
			}
			/* 点赞 */
			.comment-zan {
				display: flex;
				font-size: 10px;
				.zan-icon {
					width: 22rpx;
					height: 22rpx;
					margin-left: 10rpx;
					background-size: cover;
					background-image: url(../../static/images/comment_zan.png);
				}
			}
		}
		
		/* 评论内容 */
		.comment-content {
		    line-height: 32rpx;
		    font-size: 13px;
			color: #333333;
			margin-top: 21rpx;
			
			/* 超出2行时，隐藏并显示省略符 */
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2; /* 行数控制 */
			-webkit-box-orient: vertical;
		}
	
		/* 回复模块 */
		.reply-list {
			margin-top: 22rpx;
			border-top: 1px solid #F0F0F0;
			padding-top: 12rpx;
			display: flex;
			
			.reply-face {
				margin-right: 20rpx;
				image {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
				}
			}
			
			.all {
				margin-top: 22rpx;
				padding-top: 20rpx;
				color: #0A4025;
				border-top: 1px solid #F0F0F0;
			}
		}
	}
</style>
