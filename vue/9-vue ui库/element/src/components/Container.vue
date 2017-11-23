<template>
	<div id="container">
		<el-container>
		  <el-header>
        <el-row>
          <el-col :span="2">LOGO</el-col>
          <el-col :span="20">
            <TopNav></TopNav>            
          </el-col>
          <el-col :span="2">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                您好 {{username}}<img class="header" src="../assets/img/img.jpg">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>    
          </el-col>          
        </el-row>
        </el-header>
		  <el-container>
		    <el-container>
		      <el-main>
            <transition mode="out-in" enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
            <router-view></router-view>
            </transition>
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
    data() {
      return {
          name: ''
      }
    },
    computed:{
      username(){
          let username = localStorage.getItem('ms_username');
          // if(!username){
          //   this.$router.replace('/login');
          // }else{
          //   this.name=username
          // }
          return username ? username : this.name;
      }
    },
    methods:{
      handleCommand(command) {
          if(command == 'loginout'){
              localStorage.removeItem('ms_username')
              this.$router.replace('/login');
          }
      }
    },
    components:{
      TopNav
      }
	}
</script>
<style scoped>
#container{
	height: 100%;
}
	  .el-header, .el-footer {
    background-color:#242f42;
    color: #fff;
    text-align: center;
    line-height: 60px;
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

  .el-dropdown{
    color: #efefef;
  }
  .header{
    width: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 10px;
  }
</style>