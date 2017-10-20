<template>
	<ul>
		<li>111</li>
		<li>111</li>
		<li>111</li>
		<li v-for="fruit in list">{{fruit}}</li>
	</ul>
</template>
<script>
	export default{
		data(){
			return{
				list:['apple','banana','orange']
			}
		}
	}
</script>