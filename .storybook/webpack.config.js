const path = require('path');

const config = {
    module: {
        rules: [
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
    }
}

module.exports = config;