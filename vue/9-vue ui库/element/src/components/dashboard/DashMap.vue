<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>地图</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
        </div>
    </el-card>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.el-card{
    height: 100%;
}
</style>