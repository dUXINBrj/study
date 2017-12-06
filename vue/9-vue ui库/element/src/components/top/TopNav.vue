<template>
	<div id="topNav">
<el-menu
  :default-active="this.$route.path"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#242f42"
  text-color="#fff"
  :router= true
  active-text-color="#ffd04b">
  <el-menu-item index="/index/dashboard">Dashboard</el-menu-item>
  <el-menu-item index="/index/level1map">地图</el-menu-item>
  <el-menu-item index="/index/fire">火警</el-menu-item>
</el-menu>
	</div>
</template>
<script>
    export default {
      name:'TopNav',
      methods: {
        handleSelect(key, keyPath) {
          // console.log(key, keyPath);
        }
      }
  }
</script>
