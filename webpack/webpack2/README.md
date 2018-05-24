#按模块打包及输出文件
在webpack.config.js文件中 修改入口  
`
entry:{  
  app:'./src/index.js',  
  print:'./src/print.js'  
}  
`  
修改输出路径  
`output:{
  filename:'[name].bundle.js',
  path:path.resolve(__dirname,'dist')
}`    

执行`npm run build`后在dist文件下会生成  
app.bundle.js和print.bundle.js两个文件  
  
#使用html-webpack-plugin生成html文件
安装html-webpack-plugin  
`npm i html-webpack-plugin --save-dev`  
在webpack.config.js文件中使用插件  
`const HtmlWebpackPlugin = require('html-webpack-plugin')`  
...  
`plugins:[new HtmlWebpackPlugin({...})]`  
html-webpack-plugin配置方法（[链接](https://blog.csdn.net/kaitiren/article/details/38513715)）  
  
#使用clean-webpack-plugin在打包之前清理旧文件
安装clean-webpack-plugin  
`npm i clean-webpack-plugin --save-dev`  
在webpack.config.js文件中使用插件  
`const CleanWebpackPlugin = require('clean-webpack-plugin')`  
...  
`plugins:[new CleanWebpackPlugin(['dist'])]`