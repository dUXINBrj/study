/**
 * Created by duxin on 2017/9/7.
 */
(function () {
    //创建出两个组件 一个叫child 一个叫parent
    var Child=Vue.extend({
        template:'<div>this is child</div>'
    });
    var Parent=Vue.extend({
        //在当前组件中使用子组件
        //子组件只能在父组件的template中使用
        template:'<div>this is parent</div><br><child-components></child-components>',
        //创建当前组件的同时 将之前创建出来的Child组件注册到当前组件下
        // Child组件就成为了当前组件的子组件 只能在当前组件下使用
        components:{
            'child-components':Child
        }
    });

    //全局注册Parent组件
    Vue.component('parent-component',Parent);

     // 以上代码可以以下面这种方式写 注册创建一次解决 component()第二个参数为配置项
    // Vue.component('parent-component',{
    //     template:'<div>this is parent</div><br><child-components></child-components>',
    //     components:{
    //         'child-components':Child
    //     }
    // });

    new Vue({
        el:'#app',
        components:{
            'my-components3':{
                template:'<div>this is components3</div>'
            }
        }
    });
})();