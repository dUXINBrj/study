<template>
	<div id="container">
		<el-container>
		  <el-header>
        <el-row>
          <el-col :span="2">1</el-col>
          <el-col :span="20">
            <TopNav></TopNav>            
          </el-col>
          <el-col :span="2">2</el-col>          
        </el-row>
        </el-header>
		  <el-container>
		    <el-container>
		      <el-main>
            <router-view></router-view>
          </el-main>
		      <el-footer>Footer</el-footer>
		    </el-container>
		  </el-container>
		</el-container>
	</div>
</template>

<script>
import TopNav from './top/TopNav.vue'
	export default{
		name:'container',
    components:{
      TopNav
      }
	}
</script>
<style>
#container{
	height: 100%;
}
	  .el-header, .el-footer {
    background-color:rgb(84, 92, 100);;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container{
    height: 100%;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>