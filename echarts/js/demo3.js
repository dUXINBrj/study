/**
 * Created by duxin on 2017/9/7.
 */
(function () {
    var myEchart=echarts.init(document.getElementById('main'));
    var data=[
        {value: 335, name: 'item1'},
        {value: 310, name: 'item2'},
        {value: 234, name: 'item3'},
        {value: 135, name: 'item4'},
        {value: 1548, name: 'item5'}
    ];
    var legendName=[];
    for(var i in data){
        legendName.push(data[i].name);
    }
    myEchart.setOption({
        title:{
            text:'饼图',
            subtext:'副标题',
            x:'center'
        },
        tooltip:{
            show:true,
            trigger:'item',//提示框触发点，可以设置为none不触发
            showContent:'true',//是否显示提示浮层
            triggerOn:'mousemove',//提示浮层触发条件 click/mousemove|click/none
            enterable:'true',//鼠标是否可以进入提示浮层（方便在浮层中加操作 链接什么的）
            formatter: function(params, ticket, callback){
                var num = '20.000.00';
                var str = '<div style="text-align: center" id="toolTipBox"><p style="font-size:12px;margin:0px;color:green;">总数</p><p style="font-size:20px;margin:0px">'+ num + '</p></div>'
                return str
            },
            position: function (point, params, dom, rect, size) {
                //size参数可以拿到提示框的outerWidth和outerheight，dom参数可以拿到提示框div节点。
                //console.log(dom)可以看到，提示框是用position定位
                var marginW = Math.ceil(size.contentSize[0]/2);
                var marginH = Math.ceil(size.contentSize[1]/2);
                dom.style.marginLeft='-' + marginW + 'px';
                dom.style.marginTop='-' + marginH + 'px';
                return ['50%', '60%'];
            },
            alwaysShowContent:true,
            backgroundColor:'#fff',	//设置提示框的背景色
            textStyle:{
                color:'#333'
            }
        },
        legend: {//图例
            orient: 'vertical', //图例的位置 下面也是
            right:'right',
            top:'middle',
            data: legendName
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%','75%'],//改变圈的大小
                hoverAnimation:true,//鼠标hover到饼图上的动画
                silent:false,//是否不响应鼠标事件 不响应设为true
                center: ['50%', '60%'],
                data: data,
                label:{
                    normal:{
                        show:true//是否显示饼状图上的label 中间不留空的情况下 一根线指出去那个也是这个控制
                    }
                },
                labelLine:{ //饼图上指出去那根线
                    normal:{
                        show:true
                    }
                }
            }
        ]
    });
    // 显示 tooltip
    myEchart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: 0
    });
})();