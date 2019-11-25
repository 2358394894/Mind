<template>
	<view class="container">
		<view class="title-contents">
			<view class="top-view status" :style="{background: statusColor}"></view>
			<view class="titles" :style="{background: statusColor}">
				<text :class="[tagIndex === 0 ? 'tag-active' : '']" @tap="tagIndex === 0 ? 'return' : tagIndex = 0">热门</text>
				<text :class="[tagIndex === 1 ? 'tag-active' : '']" @tap="tagIndex === 1 ? 'return' : tagIndex = 1">推荐</text>
			</view>
		</view>
		<view class="main" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
			<!-- 刷新事件isRefresh需要异步操作返回resolve -->
			<refresh ref="refresh" @isRefresh='isRefresh'></refresh>

			<!-- 热门 -->
			<view class="hot" v-show="tagIndex === 0">
				<scroll-view class="Hotlist" scroll-y @scrolltolower="lower" scroll-with-animation>
					<!-- <view class="content"></view> -->
					<block v-for="(item,index) in Hotdata" :key="index">
						<view class="essay" style="height: 990rpx; margin-bottom: 8px;" v-if="Hotdata.length > 0">
							<image @tap="openDetail" :data-lid="item.articleId" class="coverImg" src="../../static/testCover.png"></image>
							<view @tap="openDetail" :data-lid="item.articleId" class="textBox">
								<view class="textContent">
									<text>靠近我 唤醒我\n</text>
									<text>包容着我 再深陷我\n</text>
									<text>记得我 牵挂我\n</text>
									<text>迷恋着我 再遗落我\n\n</text>
									<text>—— 冷 ——</text>
								</view>
							</view>
							<view class="info">
								<view class="author" @tap="userCenter" :data-uid="item.createdUserId">
									<image class="headPic" src="../../static/csyong.jpg"></image>
									<view class="nickname">
										<text>绿色汛期</text>
										<text class="time">{{getDateDiff(item.createdTime)}}</text>
									</view>
								</view>
								<view class="operate">
									<view class="btn praise like" @tap="givePraise(item.articleId)"><text></text><text>{{item.articleLikeNum}}</text></view>
									<view class="btn comment" @tap="openComment(item.articleId)"><text></text><text>{{item.articleCommentNum}}</text></view>
									<view class="btn share" @tap='openShare'><text></text></view>
								</view>
							</view>
						</view>
					</block>
					<view class='noCard' v-if="Hotdata.length===0">
						暂无数据
					</view>
					<view class="bottomBox" v-if="Hotdata.length > 0">loading...</view>
				</scroll-view>
			</view>

			<!-- 推荐 -->
			<view class="recomm" v-show="tagIndex === 1">
				<scroll-view class="scroll-h" :show-scrollbar="false" scroll-with-animation scroll-x :scroll-left="scrollLeft">
					<view v-for="(item,index) in tabList" :key="index" class="uni-tab-item" :data-current="index" @tap="tabSelect(index,$event)">
						<text class="uni-tab-item-title" :class="[tabIndex === index ? 'uni-tab-item-title-active' : '']">{{item.name}}</text>
						<text class="uni-tab-item-border" :class="[tabIndex === index ? 'uni-tab-item-border-active' : '']"></text>
					</view>
				</scroll-view>
				<swiper :current="tabIndex" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
				 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
					<swiper-item class="swiper-item" v-for="(listItem,listIndex) in tabList" :key="listIndex">
						<!-- <scroll-view scroll-y :style="{height: ''+swiperHeight+'px'}"><scroll-view scroll-y class="list" style="height: calc(100% - 39px);"> -->
						<scroll-view class="list" scroll-y @scrolltolower="lower" scroll-with-animation>
							<!-- <view class="content"></view> -->
							<!-- <view style="height: 990rpx; margin-bottom: 8px; background-color: #FFB511;position: relative;"
								v-for="(item,index) in listItem.data" :key="index" v-if="listItem.data.length > 0">
								<text style="position: absolute; bottom: 0px;">{{item}}</text>
							</view> -->
							<block v-for="(item,index) in listItem.data" :key="index">
								<view class="essay" style="height: 990rpx; margin-bottom: 8px;" v-if="listItem.data.length > 0">
									<image class="coverImg" src="../../static/testCover.png"></image>
									<view class="textBox">
										<view class="textContent">
											<text>靠近我 唤醒我\n</text>
											<text>包容着我 再深陷我\n</text>
											<text>记得我 牵挂我\n</text>
											<text>迷恋着我 再遗落我\n\n</text>
											<text>—— 冷 ——</text>
										</view>
									</view>
									<view class="info">
										<view class="author" @tap="userCenter" :data-uid="item.createdUserId">
											<image class="headPic" src="../../static/csyong.jpg"></image>
											<view class="nickname">
												<text>绿色汛期</text>
												<text class="time">{{getDateDiff(item.createdTime)}}</text>
											</view>
										</view>
										<view class="operate">
											<view class="btn praise like"><text></text><text>{{item.articleLikeNum}}</text></view>
											<view class="btn comment" @tap="openComment"><text></text><text>{{item.articleCommentNum}}</text></view>
											<view class="btn share"><text></text></view>
										</view>
									</view>
								</view>
							</block>
							<view class='noCard' v-if="listItem.data.length===0">
								暂无数据
							</view>
							<view class="bottomBox" v-if="listItem.data.length > 0">loading...</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 分享模块 -->
			<share :shareType="shareType" v-on:tapHideShare="exitShare"></share>
		</view>
	</view>
</template>

<script>
	import refresh from '../../components/refresh/refresh.vue'
	import share from '../../components/share-module/share-module.vue'
	export default {
		components: {
			refresh,
			share
		},
		props: {
			statusColor: {
				type: String,
				default: '#FFFFFF'
			}
		},
		data() {
			return {
				// swiperHeight: 0,
				tagIndex: 0, // 顶部选中标签
				Hotdata: [], // 热门数据
				Hotpages: 1, // 热门数据页数
				tabIndex: 0, // sweiper所在页
				pages: [1, 1, 1, 1, 1, 1, 1, 1, 1], //第几个swiper的第几页
				// tab项 - 数据
				tabList: [
					// {
					// 	name: '推荐',
					// 	id: 'tuijian',
					// 	data: [4, 5, 6]
					// }
				],
				shareType: false,
				dataUrl: '/login/selectAppArticlePage', // 分页数据链接
			}
		},
		// created () { let that = this },
		onLoad() {
			this.getEssayType()
			// this.getEssayData()
		},
		methods: {
			// tab选择
			tabSelect(index, e) {
				if (this.tabIndex === index) return false
				this.tabIndex = index
			},
			// swiper滑动
			swiperChange(e) {
				let {
					current
				} = e.target
				this.tabIndex = current
			},
			// 分页数据(触底)请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest() {
				let that = this;
				return new Promise((resolve, reject) => {
					// 热门请求
					if (this.tagIndex === 0) {
						this.Hotpages++;
						let data = {
							articleId: 1,
							pageCount: this.Hotpages,
							pageSize: 10
						}
						this.$axios.request({
							url: that.dataUrl,
							method: 'post',
							data: data
						}).then(function(res) {
							var dataArr = res.data.data.dataList;
							// let newData = new Array();
							let newData = [];
							for (var i = 0; i < dataArr.length; i++) {
								// 热门数据
								newData.push(dataArr[i])
							}
							if (dataArr.length <= 0) {
								that.Hotpages--; // 数据为空时，回退一页
							}
							uni.hideLoading()
							resolve(newData)
						})
					}
					// 推荐请求
					else if (this.tagIndex === 1) {
						this.pages[this.tabIndex]++
						let data = {
							articleId: 1,
							pageCount: this.pages[this.tabIndex],
							pageSize: 10
						}
						this.$axios.request({
							url: that.dataUrl,
							method: 'post',
							data: data
						}).then(function(res) {
							var dataArr = res.data.data.dataList;
							let newData = [];
							for (var i = 0; i < dataArr.length; i++) {
								// 推荐数据分类
								if (dataArr[i].articleTypeId == that.tabList[that.tabIndex].id) {
									newData.push(dataArr[i])
								}
							}
							if (dataArr.length <= 0) {
								that.pages[that.tabIndex]--; // 数据为空时，回退一页
							}
							uni.hideLoading()
							resolve(newData)
						})
					}
					// 	uni.showToast({
					// 		icon: 'none',
					// 		title: `请求第${that.tabIndex + 1}个导航栏的第${that.pages[that.tabIndex]}页数据成功`
					// 	})
				})
			},
			// 加载更多
			lower: function(e) {
				console.log(`加载${this.tabIndex}`) //tabIndex表示当前所在页数 根据当前所在页数发起请求并带上page页数
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				this.isRequest().then(res => {
					if (this.tagIndex === 0) {
						// 热门数据
						if (res.length <= 0) {
							uni.showToast({
								icon: 'none',
								title: `没有更多数据了!`
							})
							return false;
						}
						this.Hotdata = this.Hotdata.concat(res)
						console.log(this.Hotdata)
						this.$forceUpdate()
					}
					else if (this.tagIndex === 1) {
						// 推荐数据
						if (res.length <= 0) {
							uni.showToast({
								icon: 'none',
								title: `没有更多数据了!`
							})
							return false;
						}
						let tempList = this.tabList
						tempList[this.tabIndex].data = tempList[this.tabIndex].data.concat(res)
						console.log(tempList)
						this.tabList = tempList
						this.$forceUpdate() //二维数组，开启强制渲染
					}
				})
			},
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e)
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e)
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e)
			},
			isRefresh() {
				let that = this;
				if (this.tagIndex === 0) {
					let data = {
						articleId: 1,
						pageCount: 1,
						pageSize: 10
					}
					this.$axios.request({
						url: that.dataUrl,
						method: 'post',
						data: data
					}).then(function(res) {
						var dataArr = res.data.data.dataList
						that.Hotdata = [];
						for (var i = 0; i < dataArr.length; i++) {
							// 热门数据
							that.Hotdata.push(dataArr[i])
						}
						console.log("热门数据(刷新): " + that.Hotdata.length);
						uni.showToast({
							icon: 'success',
							mask: true, // 显示透明蒙层，防止触摸穿透
							title: '刷新成功'
						})
						that.$refs.refresh.endAfter() //刷新结束调用
					})
				} else if (this.tagIndex === 1) {
					let data = {
						articleId: 1,
						pageCount: 1,
						pageSize: 10
					}
					this.$axios.request({
						url: that.dataUrl,
						method: 'post',
						data: data
					}).then(function(res) {
						var dataArr = res.data.data.dataList
						that.tabList[that.tabIndex].data = [];
						for (var i = 0; i < dataArr.length; i++) {
							// 推荐数据分类
							if (dataArr[i].articleTypeId == (that.tabIndex + 1)) {
								that.tabList[that.tabIndex].data.push(dataArr[i])
							}
						}
						console.log("推荐数据(刷新): " + that.Hotdata.length);
						uni.showToast({
							icon: 'success',
							mask: true, // 显示透明蒙层，防止触摸穿透
							title: '刷新成功'
						})
						that.$refs.refresh.endAfter() //刷新结束调用
					})
				}
			},
			// 获取所有文章类型
			getEssayType: function() {
				let that = this;
				// 显示 loading 提示框
				uni.showLoading({
					title: 'loading...'
				})
				let url = '/login/selectAllAppArticleTyp'
				this.$axios.request({
					url: url,
					method: 'post',
				}).then(function (res) {
					var typeArr = res.data.data;
					for (var i = 0; i < typeArr.length; i++) {
						var item = {};
						item.name = typeArr[i].articleTypeName;
						item.id = typeArr[i].articleTypeId;
						item.data = [];
						that.tabList.push(item);
					}
					// console.log(that.tabList);
					that.getEssayData()
					
					uni.hideLoading()
				})
			},
			// 获取数据
			getEssayData: function() {
				let that = this;
				// 显示 loading 提示框
				// uni.showLoading({
				// 	title: 'loading...'
				// })
				let data = {
					articleId: 1,
					pageCount: 1,
					pageSize: 10
				}
				this.$axios.request({
					url: that.dataUrl,
					method: 'post',
					data: data
				}).then(function(res) {
					var dataArr = res.data.data.dataList
					console.log(dataArr)
					for (var i = 0; i < dataArr.length; i++) {
						// 热门数据
						that.Hotdata.push(dataArr[i])
						// 推荐数据分类
						for (var j = 0; j < that.tabList.length; j++) {
							if (dataArr[i].articleTypeId == that.tabList[j].id) {
								that.tabList[j].data.push(dataArr[i])
							}
						}
					}
					console.log("热门数据: " + that.Hotdata.length);
					console.log("推荐数据: " + that.tabList);
					
					// uni.hideLoading()
				})
			},
			// 详情页
			openDetail: function(e) {
				var listId = e.currentTarget.dataset.lid;
				uni.navigateTo({
					url: '/pages/detail/detail?lid='+listId
				})
			},
			// 点赞
			givePraise: function (e) {
				console.log(e);
				// 操作失败
			},
			// 用户中心
			userCenter: function(e) {
				if (this.loginCheck()) {
					var userId = e.currentTarget.dataset.uid;
					uni.navigateTo({
						url: '/pages/user/user?uId='+userId
					})
				} else {
					console.log('用户未登录');
				}
			},
			// 打开评论页
			openComment: function(e) {
				if (this.loginCheck()) {
					var articleId = e;
					uni.navigateTo({
						url: '/pages/commentList/commentList?aId='+articleId
					})
				} else {
					console.log('用户未登录');
				}
			},
			// 显示分享
			openShare: function(e) {
				this.shareType = true
				console.log('显示')
			},
			// 退出分享
			exitShare: function(e) {
				this.shareType = false
			},
			// 登录验证
			loginCheck: function () {
				var loginStatus = uni.getStorageSync('Login_status');
				if (loginStatus == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					uni.showToast({
						icon: 'none',
						title: '请先登录!'
					})
					return false;
				}
				return true;
			}
		},
		computed: {
			scrollLeft() {
				return (this.tabIndex - 1) * 60
			},
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
		// onReady: function () {
		// 	var that = this;
		// 	uni.getSystemInfo({
		// 		success: function(res) {
		// 			console.log(res)
		// 			that.swiperHeight = (res.windowHeight - 40.0)
		// 			// 错误计算 ↓
		// 			// swiperHeight: (res.screenHeight - 40.0)
		// 		},
		// 	})
		// },
	}
</script>

<style lang="scss" scoped>
	.container {
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
		font-size: 0;
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

	.titles {
		width: 100%;
		height: 44px;
		line-height: 44px;
		overflow: hidden;
		text-align: center;
		position: fixed;
		top: var(--status-bar-height);
		z-index: 999;
	}

	.titles text {
		display: inline-block;
		font-size: 15px;
		color: #999999;
		padding: 0 16px;
	}

	.titles .tag-active {
		color: #000000;
	}

	.main,
	.hot,
	.recomm {
		width: 100%;
		height: 100%;
	}

	.scroll-h {
		width: 100%;
		height: 38px;
		border-top: 1px solid #ebebeb;
		flex-direction: row;
		white-space: nowrap;
		background-color: #ffffff;
		/* flex-wrap: nowrap;
		border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}

	.uni-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 22.5px;
		padding-right: 22.5px;
		/* border: 1px solid red; */
		position: relative;
	}

	.uni-tab-item-title {
		color: #999999;
		font-size: 12px;
		height: 39px;
		line-height: 39px;
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.uni-tab-item-title-active {
		color: #000000;
	}

	.uni-tab-item-border {
		position: absolute;
		top: 85%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.uni-tab-item-border-active {
		width: 14px;
		height: 2px;
		background-color: #000000;
	}

	.swiper {
		display: block;
		height: 100%;
	}

	.swiper-item {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		background-color: #ebebeb;
	}

	.swiper-item .list {
		width: 100%;
		// height: 100%;
		/* 状态栏的高度为 var(--status-bar-height) 此变量为uni-app框架提供仅在在css生效 */
		/* 39px → 标签栏38px + 顶边1px */
		height: calc(100% - 39px - 44px - var(--status-bar-height));
	}

	/* 热门 */
	.Hotlist {
		width: 100%;
		height: calc(100% - 44px - var(--status-bar-height));
		background-color: #ebebeb;
		
		position: fixed;
		top: calc(44px + var(--status-bar-height));
	}

	/* 文章 */
	.essay {
		width: 100%;
	}

	.essay .coverImg {
		width: 100%;
		height: 500rpx;
		/* 250px */
		display: block;
	}

	/* 文字内容 */
	.essay .textBox {
		width: 100%;
		height: 400rpx;
		background-color: #ffffff;
		// border-bottom: 1px solid #EBEBEB;
		position: relative;
	}

	.essay .textBox .textContent {
		max-height: 340rpx;
		padding: 20rpx 0;
		font-size: 13px;
		color: #333333;
		// border: 1px solid pink;
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
		transform: translate(-50%, -50%);
	}

	.essay .textBox .textContent text {
		// writing-mode:tb-rl;
		// background-color: #ebebeb;
	}

	/* 底部信息模块 */
	.essay .info {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 88rpx;
		background-color: #ffffff;
		border-top: 1px solid #ebebeb;

		.author {
			height: 88rpx;
			line-height: 14px;
			display: flex;

			.headPic {
				width: 62rpx;
				height: 62rpx;
				border-radius: 50%;
				margin: 13rpx 21rpx 0 24rpx;
			}

			.nickname {
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
			.share text:nth-child(1) {
				display: block;
				background-size: cover;
			}

			.praise text:nth-child(1) {
				width: 24rpx;
				height: 22rpx;
				margin-right: 8rpx;
				background-image: url(../../static/images/info_praise.png);
			}
			.like text:nth-child(1) {
				background-image: url(../../static/images/info_praise_l.png);
			}
			
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
	
	/* 底部占位盒子 */
	.bottomBox {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 14px;
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
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}
</style>
