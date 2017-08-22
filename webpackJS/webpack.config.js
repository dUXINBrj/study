/**
 * Created by duxin on 2017/8/21.
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//_dirname是node中的全局变量指向当前执行脚本所在的文件目录
module.exports={
    devtool:'eval-source-map',//配置开发调试
    entry:__dirname+"/app/main.js",//入口文件
    output:{
        path:__dirname+"/public",//打包后文件输出位置
        filename:"bundle-[hash].js"//打包后输出的文件名
    },
    // webpack-dev-server组件的使用
    // 使用npm安装webpack-dev-server “npm install --save-dev webpack-dev-server”
    // 可以实时监听文件变化 自动打包 刷新页面
    // 需在webpack.config.js中添加server配置
    // 终端执行npm run server
    devServer:{
        contentBase:"./public",//本地服务器所加载的页面所在的目录
        historyApiFallback:true,//不跳转index.html
        inline:true //实时刷新
    },
    //loader的使用
    //安装 npm install --save-dev style-loader css-loader
    module:{
        rules:[
            {
                test:/\.css$/,
                //对css文件使用两个loader
                use:[
                    {
                        loader:"style-loader" //将css放入js中
                    },{
                        loader:"css-loader"
                    },{
                        loader:"postcss-loader"//自动添加适配不同浏览器的前缀
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin(),//压缩js代码 自带插件
        new ExtractTextPlugin("style.css")//分离css代码 npm install --save-dev extract-text-webpack-plugin
    ]
};
