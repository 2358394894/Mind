<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			// 监听中间按钮的点击事件
			// uni.onTabBarMidButtonTap(()=>{
			// 	// uni.switchTab 用于跳转到 tabBar 页面，跳转非 tabBar 页面请使用 uni.navigateTo 等接口
			// 	console.log('跳转发布页')
			// 	uni.navigateTo({
			// 		url: '/pages/publish/publish'
			// 	})
			// })
			// #endif
			// #ifdef APP-PLUS
			// setTimeout(() => {
				// // 为 tabBar 某一项的右上角添加文本
				// uni.setTabBarBadge({
				// 	index: 1,
				// 	text: '31'
				// });
				// 显示 tabBar 某一项的右上角的红点
				uni.showTabBarRedDot({
					index: 3
				});
				// 动态设置 tabBar 的整体样式
				// uni.setTabBarStyle({
				// 	color: '#FF0000',
				// 	selectedColor: '#00FF00',
				// 	backgroundColor: '#0000FF',
				// 	borderStyle: 'white'
				// });
				// 动态设置 tabBar 某一项的内容
				// uni.setTabBarItem({
				// 	index: 0,
				// 	text: 'text',
				// 	iconPath: '/static/images/tabBar_index.png',
				// 	selectedIconPath: '/static/images/tabBar_index.png'
				// })
			// }, 1000);
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	/* @import './common/uni.css'; */
	
	/*每个页面公共css */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
</style>
