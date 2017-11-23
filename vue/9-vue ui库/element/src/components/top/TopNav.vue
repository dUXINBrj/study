<template>
	<div id="topNav">
<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#242f42"
  text-color="#fff"
  :router= true
  active-text-color="#ffd04b">
  <el-menu-item index="/index/dashboard">dashboard</el-menu-item>
  <el-menu-item index="/index/level1map">地图</el-menu-item>
</el-menu>
	</div>
</template>
<script>
    export default {
      name:'TopNav',
      data() {
        return {
          activeIndex: '/index/dashboard',
        };
      },
      mounted(){
          this.activeIndex=this.$route.path;
      },
      methods: {
        handleSelect(key, keyPath) {
          // console.log(key, keyPath);
        }
      }
  }
</script>