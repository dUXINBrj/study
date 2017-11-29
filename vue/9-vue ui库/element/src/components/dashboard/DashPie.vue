<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>异常设备统计</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
        </div>
        <div id="dashPie" ref="mychart">
        
        </div>
    </el-card>
</template>

<script>
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require("echarts/lib/chart/pie");
    require("echarts/lib/component/markLine");
    require("echarts/lib/component/legend");
    export default {
        props:['pieData'],
        mounted(){
            this.initCharts();
        },
        data(){
            return {
                PieChart:{},
                legendName:{},
                option:{
                    title : {
                        text: null,
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['火警','告警','故障','离线']
                    },
                    color:['rgb(196, 37, 37)','#f28f43','#ffeb3b','#D1D1D1'],
                    series : [
                        {
                            name: '异常设备',
                            type: 'pie',
                            radius : '85%',
                            center: ['50%', '50%'],
                            data:[
                                {value:335, name:'火警'},
                                {value:310, name:'告警'},
                                {value:234, name:'故障'},
                                {value:135, name:'离线'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label:{
                                normal:{
                                    show:false
                                }
                            }
                        }
                    ]
                }
            }
        },
        methods:{
            initCharts(){
                let dom = this.$refs.mychart;
                this.PieChart = echarts.init(dom);
                this.PieChart.setOption(this.option);
            }
        },
        watch:{
            pieData:{
                handler(options) {
                    //没有有相关数据的情况下给echarts标题 并置空data
                    if(options.fireCount==0 && options.warningCount==0 && options.errorCount==0 && options.offLineCount==0){
                        this.option.series[0].data=[];
                        this.option.title.text='暂无相关数据';                        
                        this.PieChart.setOption(this.option);
                    }else{
                        this.option.series[0].data=[
                            {value:options.fireCount, name:'火警'},
                            {value:options.warningCount, name:'告警'},
                            {value:options.errorCount, name:'故障'},
                            {value:options.offLineCount, name:'离线'},
                        ]
                        this.option.title.text=null;   
                        this.PieChart.setOption(this.option);
                    }
                },
                deep:true
            }
        }
    }
</script>

<style scoped>
.el-card{
    height: 100%;
}
#dashPie{
    width: 100%;
    height: 100%;
}
</style>