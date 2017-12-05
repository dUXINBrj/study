<template>
  <div class="Content404">
    <div class="box">
      <div class="imgBox">
        <img src="../../assets/img/notfound.gif">
      </div>
      <p class="title1">您要查看的页面不存在或已删除！</p>
      <p class="title2">请检查您输入的网址是否正确</p>
      <p><el-button round @click="back">返回</el-button></p>
    </div>
  </div>
</template>
<script>
  export default {
    methods:{
      back(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
  .Content404{
    width: 100%;
    height:100%;
    background: url('../../assets/img/404-back.gif') repeat fixed;
    position: relative;
  }
  .box{
    width: 800px;
    height: 510px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 0;
    top:0;
    right:0;
    bottom: 0;
    margin: auto;
    border-right: #e1e1e1 1px solid;
    border-top: #e1e1e1 1px solid;
    border-left: #e1e1e1 1px solid;
    border-bottom: #e1e1e1 1px solid;
  }
  .imgBox{
    width: 600px;
    margin: 10px auto;
  }
  .imgBox img{
    width: 100%;
  }
  p{
    text-align: center;
    margin: 10px 0;
  }
  .title1{
    font-size: 20px;
  }
  .title2{
    font-size: 12px;
  }
</style>
