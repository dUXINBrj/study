// ./当前目录 ../上级目录
import './main.css';//使用require导入css文件
const greeter=require('./Greeter.js');
document.querySelector('#root').appendChild(greeter());
// querySelector返回一个对象
// querySelectorAll返回一个集合
// 用法和css选择器差不多