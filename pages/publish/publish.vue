<template>
	<view class="container">
		<bar :nav="setNav" v-on:tapRightButton="rightButton"></bar>
		<view class="main">
			<view class="picBox">
				<image :src="tempFilePath" @tap="chooseImage"></image>
				<view class="selectImg" @tap="chooseImage" v-if="addImgBox">
					<view class="symbol">+</view>
					<view>添加图片</view>
				</view>
			</view>
			<view class="content">
				<input class="title" type="text" value="" placeholder="标题（选填）" placeholder-style="color: #999999;" />
				<textarea class="multiline" value="" placeholder="内容" placeholder-style="color: #999999;" />
				<view class="classify">
					<view class="classTitle">选择分类：</view>
					<text class="activeText">默认</text><text>默认</text><text>默认</text><text>默认</text><text>默认</text><text>默认</text><text>默认</text><text>默认</text><text>默认</text>
				</view>
				<view class="private">
					<text class="classTitle">设为私密</text>
					<switch @change="switchChange" color="#FFCC33" />
					<!-- <switch checked @change="switch1Change" /> -->
				</view>
			</view>
			<!-- 底部推荐图片框 -->
			<view class="recommend" v-if="recommState">
				<view class="column classTitle">推荐<text @tap="closeRecomm"></text></view>
				<scroll-view class="scroll-h" scroll-y="true" >
					<view class="list">
						<image class="listItem activeImg" src="../../static/csyong.jpg"></image>
					</view>
				</scroll-view>
				<view class="column determine">确定</view>
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
					'navTitle':'创作',	// 导航标题
					'leftIcon': 'url(../../static/images/nav_close.png)',	// 左图标
					'rightIcon': 'url(../../static/images/nav_right.png)',	// 右图标
					'rightText': '预览',										// 右文本
					// #ifndef MP-WEIXIN
					'isdisPlayNavTitle': true,	// 是否显示返回按钮
					// #endif
					// #ifdef MP-WEIXIN
					'isdisPlayNavTitle': false,	// 是否显示返回按钮
					// #endif
					'isRightType': 1,			// 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				},
				recommState: false,
				addImgBox: true,
				tempFilePath: '',	// 临时图片路径
			}
		},
		watch: {
			'tempFilePath': {
				handler(newVal, oldVal) {
					// console.log(newVal, oldVal);
					if (newVal != '' && newVal != null) {
						this.addImgBox = false;
					} else{
						this.addImgBox = true;
					}
				},
				// deep: true;
			}
		},
		methods: {
			rightButton: function (e) {
				// console.log(this.setNav.navTitle);
				// console.log(e) //子组件传递的参数
				// var suitId = index;
				uni.navigateTo({
					// url: '/pages/setUp/setUp?id='+suitId,
					url: '/pages/selectStyle/selectStyle',
				})
			},
			switchChange: function (e) {
				console.log('switch 发生 change 事件，携带值为', e.target.value)
			},
			chooseImage: function (e) {
				var that = this;
				uni.showActionSheet({
					itemList: ['推荐图片', '本机图片', '取消'],
					success: function (res) {
						if (res.tapIndex === 0) {
							that.recommState = true;
						} else if (res.tapIndex ===1) {
							uni.chooseImage({
								count: 1,
								success: (res) => {
									that.tempFilePath = res.tempFilePaths[0];
									console.log("上传图片路径: " + that.tempFilePath);
								}
							});
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			closeRecomm: function () {
				this.recommState = false;
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
	}
	.picBox {
		width: 100%;
		height: 500rpx;
		background-color: #F7F7F7;
		position: relative;
		
		image {
			width: 100%;
			height: 100%;
		}
		
		.selectImg {
			width: 200rpx;
			height: 200rpx;
			border: 1px dashed #666666;
			color: #666666;
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			
			.symbol {
				font-size: 25px;
				margin-top: 30rpx;
			}
		}
	}
	
	.content {
		width: 100%;
		background-color: #FFFFFF;
		
		.title {
			height: 78rpx;
			text-align: center;
		}
		
		.multiline {
			padding: 0px;
			margin: 0px;
			box-sizing: border-box;
			width: 100%;
			height: 238rpx;
			padding: 24rpx 0;
			text-align: center;
			border-top: 1px solid #E7E7E7;
			border-bottom: 1px solid #E7E7E7;
		}
		
		.classify {
			width: 100%;
			height: 204rpx;
			
			.classTitle {
				color: #000000;
				margin: 20rpx 0 0 21rpx;
			}
			
			text {
				display: inline-block;
				width: 92rpx;
				height: 44rpx;
				box-sizing: border-box;
				line-height: 44rpx;
				text-align: center;
				font-size: 13px;
				color: #333333;
				/* border: 1px dotted #333333; */
				border: 1px dashed #333333;
				border-radius: 4rpx;
				margin: 20rpx 0 0 28rpx;
			}
			.activeText {
				color: #FFFFFF;
				background-color: #000000;
			}
		}
		
		.private {
			width: 100%;
			height: 90rpx;
			box-sizing: border-box;
			border-top: 1px solid #E7E7E7;
			border-bottom: 1px solid #E7E7E7;
		
			.classTitle {
				color: #000000;
				line-height: 90rpx;
				margin-left: 21rpx;
			}
			
			switch {
				float: right;
				margin: 10rpx 10rpx 0 0;
			}
		}
	}
	
	.recommend {
		width: 100%;
		height: 590rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0px;
		z-index: 100;
		
		.column {
			width: 100%;
			text-align: center;
			font-size: 17px;
			color: #FFFFFF;
			background-color: #0A4025;
		}
		
		.classTitle {
			height: 76rpx;
			line-height: 76rpx;
			
			text {
				width: 44rpx;
				height: 44rpx;
				display: block;
				position: absolute;
				top: 16rpx;
				right: 24rpx;
				background-image: url(../../static/images/nav_close_w.png);
				background-size: cover;
			}
		}
		
		.determine {
			height: 88rpx;
			line-height: 88rpx;
			position: absolute;
			bottom: 0px;
		}
		
		.scroll-h {
			width: 100%;
			height: 100%;
		}
		
		.list {
			margin: 0 22rpx 180rpx 22rpx; /* 44px + 38px + 8px */
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.listItem {
				width: 228rpx;
				height: 154rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
			}
			
			.activeImg {
				border: 1px solid #0A4025;
			}
		}
		/* 父级添加after伪类法，解决最后一排数量不够两端分布的情况 */
		.list:after{
			content: '';
			width: 228rpx;
			// background-color: red;
		}
	}
</style>
