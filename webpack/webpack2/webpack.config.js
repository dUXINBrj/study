const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin =require('clean-webpack-plugin');

module.exports={
    entry:{
        app:'./src/index.js',
        print:'./src/print.js'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins:[
        new cleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'HtmlWebpackPlugin',
            template: 'index.html',
            hash: true,
            cache:true,
            chunksSortMode: 'dependency',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        })
    ]
};