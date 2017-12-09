<template>
        <div class="text item" id="warnNowEcharts" ref="mychart" v-loading='echartsLoading'></div>
</template>

<script>
  const echarts = require('echarts/lib/echarts');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require("echarts/lib/chart/line");
  require("echarts/lib/component/markLine");
  require("echarts/lib/component/legend");

  export default {
    props: ["deviceCode"],
    created(){
      this.getEchartsData();
    },
    data(){
      return{
         lineChart:{},//保存echarts折线图实例
         dashLineDevice:'',//下拉框选择的值
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
            x:'center',
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
          series: [{
            name:'',
            type:'line',
            connectNulls:true,
            showAllSymbol:true,
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
          }]
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
          let max=Math.max.apply(null, seriesData);
          let min=Math.min.apply(null, seriesData);
          min<0?min=min:min=0;
          obj.yAxis.max=max;
          obj.yAxis.min=min;
           let _seriesData=seriesData;
          _seriesData[9]={
            value:seriesData[9],
            itemStyle:{
              normal:{
                color:'red'
              }
            }
          };
           obj.series[0].data=_seriesData;
           if(_this.echsrtsData[0].mainattribute_attributeminval!=null){
             obj.series[0].markLine.data[0]=[{
               name:_this.echsrtsData[0].mainattribute_attributeminval,
               coord: [xArr[0], _this.echsrtsData[0].mainattribute_attributeminval]
             }, {
               coord: [xArr[xArr.length-1], _this.echsrtsData[0].mainattribute_attributeminval]
             }];
           }else{
             obj.series[0].markLine.data=[];
           }
           if(_this.echsrtsData[0].mainattribute_attributemaxval!=null){
             obj.series[0].markLine.data[1]=[{
               name:_this.echsrtsData[0].mainattribute_attributemaxval,
               coord: [xArr[0], _this.echsrtsData[0].mainattribute_attributemaxval]
             }, {
               coord: [xArr[xArr.length-1], _this.echsrtsData[0].mainattribute_attributemaxval]
             }];
           }else{
             obj.series[0].markLine.data=[];
           }
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
      getEchartsData(){
        let _this=this;
        this.echartsLoading=true;
        this.$http.get(_this.$lib.dashBoard.getLine,{devicecode:_this.deviceCode}).
        then(function (response) {
          _this.echartsLoading=false;
          if(!response.data.WSListReturn.success){
            _this.$msg({
              message: '获取模拟量值失败',
              type: 'error'
            });
            _this.echsrtsData=[];
            return false;
          }
          _this.echsrtsData=response.data.WSListReturn.root;
        })
        .catch(function (error) {
          console.log(error);
          _this.echartsLoading=false;
          _this.echsrtsData=[];
          _this.$msg({
            message: '获取模拟量值失败',
            type: 'error'
          });
        });
      }
    },
    watch:{
      opt:{
        handler(options) {
          let dom = this.$refs.mychart;
          this.lineChart = echarts.init(dom);
          this.lineChart.setOption(this.opt);
        },
        deep:true
      }
    }
  }
</script>

<style>
  #warnNowEcharts{
    width: 100%;
    height:100%;
  }
</style>
