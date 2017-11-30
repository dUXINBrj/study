<template>
    <div class="wrapper">
		  <div class="header">
        <el-row>
          <el-col :span="2">LOGO</el-col>
          <el-col :span="20">
            <TopNav></TopNav>
          </el-col>
          <el-col :span="2">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                您好 {{username}}<img class="header-icon" src="../assets/img/img.gif">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
		  </div>
      <div class="content">
          <transition mode="out-in" enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
          <router-view></router-view>
          </transition>
      </div>
      <div class="footer">
        footer
      </div>
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
  .content{
    background: none repeat scroll 0 0 #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom:30px;
    width: auto;
    padding:0;
    box-sizing: border-box;
    overflow-y: hidden;
  }
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    background-color: rgb(36, 47, 66);
  }
  .footer{
    background-color: rgb(36, 47, 66);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: 30px;
    box-sizing: border-box;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }
  .el-dropdown{
    color: #efefef;
  }
  .header-icon{
    width: 40px;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 10px;
  }
</style>
