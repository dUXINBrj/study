/**
 * Created by duxin on 2017/8/21.
 */
//_dirname是node中的全局变量指向当前执行脚本所在的文件目录
module.exports={
    devtool:'eval-source-map',//配置开发调试
    entry:__dirname+"/app/main.js",//入口文件
    output:{
        path:__dirname+"/public",//打包后文件输出位置
        filename:"bundle.js"//打包后输出的文件名
    }
};
