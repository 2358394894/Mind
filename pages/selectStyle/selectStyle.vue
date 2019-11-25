<template>
	<view class="container">
		<bar :nav="setNav" v-on:tapRightButton="rightButton"></bar>
		<view class="main">
			<image src="../../static/user-bg.jpg"></image>
			<view class="textBox">
				<view class="textContent">
					<text>靠近我  唤醒我\n</text>
					<text>包容着我  再深陷我\n</text>
					<text>记得我  牵挂我\n</text>
					<text>记得我  牵挂我\n</text>
					<text>迷恋着我  再遗落我\n\n</text>
					<text>—— 冷 ——</text>
				</view>
			</view>
			<view class="choice">
				<view class="icons"></view>
				<view class="icons"></view>
				<view class="icons"></view>
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
					'navTitle': '样式',	// 导航标题
					'leftIcon': 'url(../../static/images/nav_close.png)',	// 左图标
					// 'rightIcon': 'url(../../static/images/nav_right.png)',	// 右图标
					'rightText': '预览',										// 右文本
					'isdisPlayNavTitle': true,	// 是否显示返回按钮
					'isRightType': 2,			// 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				}
			}
		},
		methods: {
			rightButton: function (e) {
				// console.log(e) //子组件传递的参数
				uni.navigateTo({
					url: '/pages/preImage/preImage',
				})
			},
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
		
		image {
			width: 100%;
			height: 500rpx;
			display: block;
		}
		
		.textBox {
			width: 100%;
			height: 586rpx;
			position: relative;
		}
		
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
			/* height: 340rpx;
			writing-mode:vertical-rl; */
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			
			text {
				background-color: #EBEBEB;
			}
		}
		
		.choice {
			width: 100%;
			height: 120rpx;
			background-color: #0A4025;
			position: fixed;
			bottom: 0px;
			
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			
			.icons {
				width: 76rpx;
				height: 76rpx;
				box-sizing: border-box;
				border: 1px dashed #0A4025;
				background-color: #FFFFFF;
				margin: 22rpx 26rpx 0 26rpx;
				background-size: cover;
			}
			
			:nth-child(1) {
				background-image: url(../../static/images/selectStyle_text.png);
			}
			:nth-child(2) {
				background-image: url(../../static/images/selectStyle_left.png);
			}
			:nth-child(3) {
				background-image: url(../../static/images/selectStyle_across.png);
			}
		}
	}
</style>
