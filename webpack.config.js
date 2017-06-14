const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './src/js/App.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                include: /src|retail\-ui/
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
                include: /src|retail\-ui/
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