/**
 * Created by duxin on 2017/9/7.
 */
(function () {
    //创建组件
    var myComponent=Vue.extend({
        template:'<div>This is my first component!</div>'
    });
    //注册组件，制定组件的标签为<my-component>
    //该注册方法为全局注册 只要是vue的实例都可以使用
    Vue.component('my-component',myComponent);

    new Vue({
        el:'#app',
        components:{
            'my-component2':myComponent
            //局部注册 只有在当前vue实例下才可以使用my-component2组件
            //这里的components是复数形式，全局的是component
        }
    });

    new Vue({
        //没有注册组件my-component也可以使用
        el:'#app2'
    });
})();