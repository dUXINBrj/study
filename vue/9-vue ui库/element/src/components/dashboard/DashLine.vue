<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>折线图</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="text item" id="dashLine" ref="mychart">
        
        </div>
    </el-card>
</template>

<script>
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require("echarts/lib/chart/line");
    export default {
        mounted(){
            this.initCharts();
        },
        data(){
            return{
               myChart:{} 
            }
        },
        methods:{
            initCharts(){
                let dom = this.$refs.mychart;
                this.myChart = echarts.init(dom);
            },
        }
    }
</script>

<style scoped>
.el-card{
    height: 100%;
}
#dashLine{
    width: 100%;
    height:200px;
}
</style>