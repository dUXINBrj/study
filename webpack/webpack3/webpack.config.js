const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin =require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports={
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
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
    devServer:{
        contentBase: './dist',
        hot: true
    },
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
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};