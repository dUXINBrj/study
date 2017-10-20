<template>
	<h3>用户注册</h3>
	<ul>
		<li v-for="fruit in list">{{fruit}}</li>
	</ul>
</template>
<<script>
	export default {
		data(){
			return{
				list:['apple','banana','orange']
			}
		}
	}
</script>
