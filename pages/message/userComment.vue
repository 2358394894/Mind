<template>
	<view class="container">
		<bar :nav="setNav" v-on:tapRightButton="rightButton"></bar>
		<view class="main" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
			<!-- 刷新事件isRefresh需要异步操作返回resolve -->
			<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
			<!-- 评论区 start -->
			<view class="comments">
				<view class="comment-list">
					<view class="comment-info" @tap="userCenter">
						<image src="../../static/user-bg.jpg"></image>
						<text>网友</text>
						<text>9-12&ensp;08:12</text>
					</view>
					<view 	class="comment-body"
							v-for="(item,idx) in testList"
							:key="idx">
						<view class="comment-tip">
							<text>{{item.id}}</text>
							<view class="replyBtn" @tap="reply(item)">回复</view>
						</view>
						<view class="inputBox" v-if="item.show">
							<textarea	class="multiline"
										auto-height 
										value="" 
										placeholder="写点什么..." 
										placeholder-style="color: #999999;" />
						</view>
						<view class="comment-content" @tap="openDetail">
							<image src="../../static/user-bg.jpg"></image>
							<view class="comment-text">
								<text>很酷的HBuilderX和uni-app</text>
								<text>很酷的HBuilderX和uni-app</text>
							</view>
						</view>
						<view class="replyBox">
							<view class="reply-user">
								回复 冷冷：
							</view>
							<view class="reply-content">是的哦！这是一首歌呢，是的哦！这是一首歌呢，是的哦！这是一首歌呢是的哦！这是一首歌呢</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import bar from '../../components/bar/bar.vue'
import refresh from '../../components/refresh/refresh.vue'
export default {
	components: {
		bar,
		refresh
	},
	data() {
		return {
			testList: [
				{
					id: 'one',
					show: true
				},
				{
					id: 'two',
					show: false
				}
			],
			// 自定义导航栏对象
			setNav: {
				bg: '#FFFFFF', // 背景色
				navTitle: '评论', // 导航标题
				leftIcon: 'url(../../static/images/nav_left.png)', // 左图标
				// 'rightIcon': 'url(../../static/images/nav_right.png)',	// 右图标
				// 'rightText': '发布',										// 右文本
				isdisPlayNavTitle: true, // 是否显示返回按钮
				isRightType: 0 // 右侧标签显示类型 0不显示 1图标 2文本
				// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
			},
			inpType: 1
		}
	},
	// 页面上拉触底事件的处理函数
	onReachBottom: function(e) {
		console.log(e)
	},
	methods: {
		rightButton: function(e) {
			console.log(e) //子组件传递的参数
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
			setTimeout(() => {
				uni.showToast({
					icon: 'success',
					mask: true, // 显示透明蒙层，防止触摸穿透
					title: '刷新成功'
				})
				this.$refs.refresh.endAfter() //刷新结束调用
			}, 1000)
		},
		// 回复
		reply: function(item) {
			// 拿到点击的时候元素的item
			console.log(item.id)
			let flag = item.show
			// 用ES2015的数组遍历方法，
			this.testList.map(function(ele) {
				console.log('ele', ele)
				console.log('item', item)
				// 判断遍历中的ele的id与点击时选中的id是否相等，相等则让ele的取反show
				if (ele.id === item.id) {
					ele.show = !flag
				}
			})
		},
		// 详情页
		openDetail: function(e) {
			uni.navigateTo({
				url: '/pages/detail/detail'
			})
		},
		// 用户中心
		userCenter: function() {
			uni.navigateTo({
				url: '/pages/user/user'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: #ffffff;
  font-size: 15px;
}
.main {
  height: 100%;
  border-top: 1px solid #ededed;
}

/* 评论列表 */
.comments {
  padding: 0 20rpx 88rpx 20rpx;
  display: flex;
  flex-direction: column;
}

.comment-list {
  box-sizing: border-box;
  padding: 12rpx 0 21rpx 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}
/* 头像 */
.comment-info {
  width: 100%;
  height: 62rpx;
  line-height: 62rpx;
  font-size: 13px;
  color: #666666;

  image {
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
    margin-right: 21rpx;
    overflow: hidden;
    display: block;
    float: left;
  }
  text:nth-child(3) {
    font-size: 11px;
    float: right;
  }
}
/* 内容框 */
.comment-body {
  width: 100%;

  .comment-tip {
    width: 100%;
    height: 76rpx;
    line-height: 76rpx;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .replyBtn {
      width: 78rpx;
      height: 44rpx;
      line-height: 44rpx;
      text-align: center;
      font-size: 13px;
      color: #999999;
      border: 1px solid #cccccc;
      border-radius: 6rpx;
    }
  }

  .inputBox {
    width: 100%;
    background-color: #ffecec;
    border-bottom: 1px solid #0a4025;
    margin-bottom: 8rpx;

    .multiline {
      padding: 0px;
      margin: 0px;
      box-sizing: border-box;
      width: auto;
      min-height: 66rpx;
      max-height: 100rpx;
      padding: 14rpx 26rpx;
      border-radius: 8rpx;
    }
  }

  /* 评论内容 */
  .comment-content {
    display: flex;
    height: 100rpx;
    overflow: hidden;
    background-color: #f7f7f7;

    image {
      min-width: 150rpx;
      min-height: 100rpx;
      max-width: 150rpx;
      max-height: 100rpx;
      margin-right: 14rpx;
      display: block;
    }

    .comment-text {
      /* 超出1行时，隐藏并显示省略符 */
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* 行数控制 */
      -webkit-box-orient: vertical;

      text {
        font-size: 11px;
        display: block;
        /* 行高为1/2内容框高度, 使文字只显示两行 */
        line-height: 50rpx;
        color: #666666;
      }
    }
  }

  .replyBox {
    display: flex;
    width: 100%;
    height: 60rpx;
    font-size: 11px;
    color: #000000;
    box-sizing: border-box;
    padding-left: 167rpx;
    overflow: hidden;

    .reply-user {
      min-width: 140rpx;

      text {
        color: #999999;
      }
    }

    .reply-content {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 行数控制 */
      -webkit-box-orient: vertical;
    }
  }
}
</style>
