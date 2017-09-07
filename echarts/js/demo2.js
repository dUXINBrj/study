/**
 * Created by duxin on 2017/9/7.
 */
(function () {
    var myChart = echarts.init(document.getElementById('main'));
    var data=[
        {value:235, name:'视频广告'},
        {value:274, name:'联盟广告'},
        {value:310, name:'邮件营销'},
        {value:335, name:'直接访问'},
        {value:400, name:'搜索引擎'}
    ];
    myChart.setOption({
        series : [
            {
                roseType: 'angle',
                itemStyle: {
                    normal: {//正常情况下的样式
                        // 阴影的大小
                        shadowBlur: 200,
                        // 阴影水平方向上的偏移
                        shadowOffsetX: 0,
                        // 阴影垂直方向上的偏移
                        shadowOffsetY: 0,
                        // 阴影颜色
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    emphasis: { //鼠标hover时的样式
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                backgroundColor: '#2c343c',
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data:data
            }
        ]
    })
})();