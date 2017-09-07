/**
 * Created by duxin on 2017/9/7.
 */
(function () {
    new Vue({
        el:'#app',
        data:{
            name:'du',
            age:23
        },
        //子组件要使用父组件中的数据 必须在子组件中使用props
        //在这里我们可将vue的实例看作my-components组件的父组件
        components:{
            'my-components':{
                template:'#myComponent',
                props:['myName','myAge']
            }
        }
    });
})();