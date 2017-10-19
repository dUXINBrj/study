<template>
	<div id="app">
		<a v-link="{path:'/home'}">首页</a>
		<a v-link="{path:'/news'}">新闻</a>
		<router-view></router-view>
	</div>
</template>
<script>
	import Menu from './components/Menu.vue'

	export default{
		data(){
			return {
				msg:'welcome Vue ^_^'
			}
		},
		methods:{
			change(){
				this.msg='wahaha'
			}
		},
		components:{
			'my-menu':Menu
		}	
	}
</script>
<style>
	body{
		background: #ccc
	}
</style>