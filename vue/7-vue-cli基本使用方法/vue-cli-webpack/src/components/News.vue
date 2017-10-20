<template>
  <h4 @click="change">{{newsData}}</h2>
</template>
<script>
    export default{
        data(){
            return {
                newsData:'news1'
            }
        },
        methods:{
            change(){
                this.newsData="news2"
            }
        }
    }
</script>