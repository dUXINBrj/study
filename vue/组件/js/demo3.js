/**
 * Created by duxin on 2017/9/7.
 */
(function () {
//使用script或template标签创建组件
    Vue.component('script-component',{
        template:'#myComponent'
    });
    //vue组件中的data和el选项必须使用函数 否则报错
    Vue.component('tpl-commponent',{
        template:'#tplComponent',
        data:function () {
            return{a:1}
        }
    });
    new Vue({
        el:'#app'
    });
})();