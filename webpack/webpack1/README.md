#webpack

>使用webpack的基本方法

#直接执行webpack打包命令
node8.2以上 直接执行 npx webpack
#通过执行webpack配置文件进行webpack打包
新建webpack.config.js文件
执行 npx webpack --config webpack.config.js
#通过npm脚本执行webpack打包
在拥有webpack.config.js文件的基础上 在package.json中增加
  "scripts": {
    "build":"webpack"
  }
之后执行 npm run build

>webpack.config.js配置说明

#入口文件
entry:'xxx.js'
可以通过数组形式接收多个入口文件 eg:
entry:['aaa.js','bbb.js']
#文件输出
output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
}
__dirname在node中指向当前文件目录