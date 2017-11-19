<template>
  <div id="news">
    <h1>这是新闻页</h1>
    <ul>
      <li v-for="(val,index) in list">{{val}}</li>
    </ul>
  </div>
</template>

<script>
  export default{
    name:'news',
    data(){
      return {
        list:['111','222','333']
      }
    },
    mounted(){
      this.$nextTick(function () {    //用于每次路由切换到改组件时执行的方法
        console.log(1);
      })
    }
  }
</script>

<style scope>
  #news{
    display: inline-block;
  }
</style>
