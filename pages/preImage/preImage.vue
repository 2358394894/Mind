<template>
	<view class="container">
		<bar :nav="setNav" v-on:tapRightButton="rightButton"></bar>
		<view class="main">
			<view class="imgBox">
				<image src="../../static/testpic.png"></image>
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
					'navTitle': '预览',	// 导航标题
					'leftIcon': 'url(../../static/images/nav_left.png)',	// 左图标
					// 'rightIcon': 'url(../../static/images/nav_right.png)',	// 右图标
					'rightText': '发布',										// 右文本
					'isdisPlayNavTitle': true,	// 是否显示返回按钮
					'isRightType': 2,			// 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				}
			}
		},
		methods: {
			rightButton: function (e) {
				console.log(e) //子组件传递的参数
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
		position: relative;
	
		.imgBox {
			width: 600rpx;
			height: 1068rpx;
			margin: 58rpx auto;
			box-shadow: 0 0 10px rgba(10, 64, 37, .6);
		
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
</style>
