<template>
    <el-card class="box-card dashline-card">
        <div slot="header" class="clearfix" style="position: relative">
        <span>折线图</span>
          <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
            <el-button style="float: right; padding: 3px 0" type="text" @click="showSel=!showSel" v-show="!showSel" class="dasnPieShowSel"><i class="el-icon-more-outline"></i></el-button>
          </transition>
          <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
          <div class="dasnPieSel" v-show="showSel">
            <el-select v-model="dashLineDevice" filterable placeholder="请选择">
              <el-option
                v-for="item in lineDeviceData"
                :key="item.devicename"
                :label="item.devicename+'('+item.devicecode+')'"
                :value="item.devicecode">
              </el-option>
            </el-select>
            <span @click="showSel=!showSel"><i class="el-icon-d-arrow-right"></i></span>
            </div>
          </transition>
        </div>
        <div class="text item" id="dashLine" ref="mychart" v-loading='echartsLoading'>
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
        props: ["lineDeviceData","deviceCode"],
        mounted(){
            this.initCharts();
        },
        data(){
            return{
               lineChart:{},//保存echarts折线图实例
               dashLineDevice:'',//下拉框选择的值
               showSel:false,//显示隐藏下拉选择框
               dashLineDeviceList:[],//下拉框option数据
               echartsLoading:false,
               echsrtsData:[],
               option : {//echarts配置
                title: {
                    text:"暂无相关数据",
                    x:'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    "borderWidth": 0,
                    "top": 5,
                    textStyle: {
                        color: "#fff"
                    }
                },
            }
            }
        },
        computed:{
            opt(){
                let _this = this;
                let obj={
                    title: {
                        text:'',
                        subtext: '',
                        itemGap:2,
                        textStyle:{
                          fontSize:12
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[],
                        top:'bottom'
                    },
                    toolbox: {
                        show: false
                    },
                    grid: {
                        "borderWidth": 0,
                        top:40,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        max:'',
                        name:"",
                        nameLocation:'center',
                        nameGap:'30'
                    },
                    series: [
                        {
                            name:'',
                            type:'line',
                            data:[],
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
                                            textStyle: {
                                                fontSize: 16,
                                                fontWeight: "bolder",
                                            },
                                        }
                                    },

                                },
                                data: [],
                            }
                        }
                    ]
                };
                 if(_this.echsrtsData.length!=0){
                     obj.xAxis.show=true;
                     obj.yAxis.show=true;
                     obj.title.text=_this.echsrtsData[0].device_type_name;
                     obj.title.subtext=_this.echsrtsData[0].device_sub_type_name;
                     obj.legend.data[0]=_this.echsrtsData[0].deviceattribute+"("+_this.echsrtsData[0].bizunit+")";
                     obj.series[0].name=_this.echsrtsData[0].deviceattribute+"("+_this.echsrtsData[0].bizunit+")";
                     obj.yAxis.name=_this.echsrtsData[0].deviceattribute+"("+_this.echsrtsData[0].bizunit+")";
                     let xArr=[];
                     let seriesData=[];
                     _this.echsrtsData.forEach((val,index)=>{
                       xArr[index]=val.datatime;
                       seriesData[index]=val.bizvalue;
                     });
                     obj.xAxis.data=xArr;
                     obj.series[0].data=seriesData;
                     obj.series[0].markLine.data[0]=[{
                       name:_this.echsrtsData[0].mainattribute_attributeminval,
                       coord: [xArr[0], _this.echsrtsData[0].mainattribute_attributeminval]
                     }, {
                       coord: [xArr[xArr.length-1], _this.echsrtsData[0].mainattribute_attributeminval]
                     }];
                     obj.series[0].markLine.data[1]=[{
                       name:_this.echsrtsData[0].mainattribute_attributemaxval,
                       coord: [xArr[0], _this.echsrtsData[0].mainattribute_attributemaxval]
                     }, {
                       coord: [xArr[xArr.length-1], _this.echsrtsData[0].mainattribute_attributemaxval]
                     }];
                     seriesData.push(_this.echsrtsData[0].mainattribute_attributemaxval);
                     seriesData.push(_this.echsrtsData[0].mainattribute_attributeminval);
                     let max=Math.max.apply(null, seriesData);
                     let min=Math.min.apply(null, seriesData);
                     min<0?min=min:min=0;
                     obj.yAxis.max=max;
                     obj.yAxis.min=min;
                 }else{
                     obj.title.text="暂无相关数据";
                     obj.title.subtext=null;
                     obj.series[0].data=[];
                     obj.xAxis.data=[];
                     obj.xAxis.show=false;
                     obj.yAxis.show=false;
                     obj.series[0].markLine='';
                     obj.title.textStyle.fontSize=18;
                 }
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
                this.lineChart.setOption(this.opt);
              },
              deep:true
            },
            dashLineDevice:{
              handler(options) {
                let _this=this;
                this.echartsLoading=true;
                this.$http.get(_this.$lib.dashBoard.getLine,{devicecode:options}).
                then(function (response) {
                  _this.echartsLoading=false;
                  if(!response.data.WSListReturn.success){
                    toastr.error("获取设备模拟量值失败！");
                    _this.echsrtsData=[];
                    return false;
                  }
                  _this.echsrtsData=response.data.WSListReturn.root;
                })
                .catch(function (error) {
                  _this.echartsLoading=false;
                  _this.echsrtsData=[];
                  toastr.error("网络请求失败，请稍后重试！");
                });
              },
              deep:true
            },
            deviceCode:{
              handler(options) {
                this.dashLineDevice=options;
              },
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
    height:100%;
  }
  .el-card__body{
    height: 76%;
  }
  .dashline-card .el-card__body{
    padding:0;
    padding-top: 5px;
  }
  .dashline-card .el-input__inner{
    height: 20px;
  }
  .dasnPieShowSel{
    position: absolute;
    right: 10px;
    top: 2px;
  }
  .dasnPieSel{
    display: inline-block;
    position: absolute;
    right: 5px;
    top:0;
  }
  .el-icon-d-arrow-right{
    cursor: pointer;
  }
</style>
