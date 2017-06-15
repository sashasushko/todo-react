const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './source/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                include: /source|retail\-ui/
            },
            {
                test: /\.less$/,
                loaders: [
                    'classnames-loader',
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
                include: /source|retail\-ui/
            },
            {
                test: /\.(png|woff|woff2|eot)$/,
                loader: "file-loader"
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            'web_modules'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.html',
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
