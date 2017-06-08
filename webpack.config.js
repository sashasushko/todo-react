const path = require('path');

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
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000
    }
};

module.exports = config;