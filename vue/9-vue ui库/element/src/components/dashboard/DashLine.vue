<template>
    <el-card class="box-card dashline-card">
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
    require("echarts/lib/component/legend");

    export default {
        props: ["linedata"],
        mounted(){
            this.initCharts();
        },
        data(){
            return{
               lineChart:{},
               option : {
                title: {
                    text:null
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['最低气温'],
                    top:'bottom'
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
                        formatter: '{value}'
                    },
                    max:12,
                    name:"y坐标",
                    nameLocation:'center',
                    nameGap:'30'
                },
                series: [
                    {
                        name:'最低气温',
                        type:'line',
                        data:[1, -2, 2, 5, 3, 2, 0],
                        itemStyle : {  
                                normal : { 
                                    color:'#147dea',   
                                    lineStyle:{  
                                        color:'#3a8ee6'  
                                    }  
                                }  
                        },
                        markLine: {
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,
                                    lineStyle: {
                                        type: 'solid',
                                        color: 'red',
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
        computed:{
            origin () {
                return this.linedata;
            },
            opt(){
                let _this = this;

                let obj={
                    title: {
                        text:'',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最低气温'],
                        top:'bottom'
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
                            formatter: '{value}'
                        },
                        max:12,
                        name:"y坐标",
                        nameLocation:'center',
                        nameGap:'30'
                    },
                    series: [
                        {
                            name:'最低气温',
                            type:'line',
                            data:[1, -2, 2, 5, 3, 2, 0],
                            itemStyle : {  
                                    normal : { 
                                        color:'#147dea',   
                                        lineStyle:{  
                                            color:'#3a8ee6'  
                                        }  
                                    }  
                            },
                            markLine: {
                                itemStyle: {
                                    normal: {
                                        borderWidth: 1,
                                        lineStyle: {
                                            type: 'solid',
                                            color: 'red',
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
                // if(_this.origin.length!=0){
                //     obj.title.text=_this.origin[0].device_type_name;
                // }
                return obj;
            }
        },
        methods:{
            initCharts(){
                let dom = this.$refs.mychart;
                this.lineChart = echarts.init(dom);
                this.lineChart.setOption(this.option);
            },
        },
        watch:{
            opt:{
                handler(options) {
                    console.log(1);
                    this.lineChart.setOption(this.opt)
                },
                deep:true
            }
        }
    }
</script>

<style>
.el-card{
    height: 100%;
}
#dashLine{
    width: 100%;
    height:200px;
}
.el-card__body{
    height: 76%;
}
</style>