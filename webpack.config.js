const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './src/js/App.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'App.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules|dist/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules|dist/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000
    }
};

module.exports = config;