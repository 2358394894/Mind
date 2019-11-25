<template>
	<view class="container">
		<bar :nav="setNav" v-on:tapRightButton="rightButton"></bar>
		<view class="main">
			<input type="text" value="" placeholder="请输入您的昵称..." placeholder-style="color: #CCCCCC;" />
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
					'navTitle': '昵称',	// 导航标题
					'borderStyle': '0px', // 导航底边样式 '1px solid #FFB400'
					'leftIcon': 'url(../../static/images/nav_left.png)',	// 左图标
					// 'rightIcon': 'url(../../static/images/nav_right.png)',	// 右图标
					'rightText': '保存',	 // 右文本
					'isdisPlayNavTitle': true,	// 是否显示返回按钮
					'isRightType': 2, // 右侧标签显示类型 0不显示 1图标 2文本
					// 由于导航栏是共用的，把所有的东西封装好，然后有些页面不需要的东西通过条件控制进行显示与隐藏
				},
			}
		},
		methods: {
			rightButton: function () {
				console.log('保存操作')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		overflow: auto;
		background-color: #F3F3F3;
		font-size: 15px;
	}
	.main {
		width: 750rpx;
		height: 100%;
		
		input {
			height: 88rpx;
			box-sizing: border-box;
			padding-left: 21rpx;
			background-color: #FFFFFF;
		}
	}
</style>
