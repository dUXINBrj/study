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
    require("echarts/lib/component/markLine");
    export default {
        mounted(){
            this.initCharts();
        },
        data(){
            return{
               myChart:{},
               option : {
                title: {
                    text:null
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: false
                },
                grid: {
                    "borderWidth": 0,
                    "top": 5,
                    textStyle: {
                        color: "#fff"
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    },
                    max:12
                },
                series: [
                    {
                        name:'最低气温',
                        type:'line',
                        data:[1, -2, 2, 5, 3, 2, 0],
                        markLine: {
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,
                                    lineStyle: {
                                        type: 'solid',
                                        color: 'red ',
                                        width: 2,
                                    },

                                    label: {
                                        formatter: '12.6',
                                        textStyle: {
                                            fontSize: 16,
                                            fontWeight: "bolder",
                                        },
                                    }
                                },

                            },
                            data: [
                                [{
                                    coord: ['周一', 9]
                                }, {
                                    coord: ['周日', 9]
                                }],
                                [{
                                    coord: ['周一', 1]
                                }, {
                                    coord: ['周日', 1]
                                }]
                            ],
                        }
                    }
                ]
            }
            }
        },
        methods:{
            initCharts(){
                let dom = this.$refs.mychart;
                let myChart = echarts.init(dom);
                myChart.setOption(this.option);
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
    height:180px;
}
</style>