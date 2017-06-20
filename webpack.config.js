const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: ["babel-polyfill", "./source/app.js"],
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "env",
              {
                modules: false
              }
            ],
            "stage-0",
            "react"
          ]
        },
        include: /source/
      },
      {
        test: /\.(js|jsx)?$/,
        loader: "babel-loader",
        options: {
          presets: ["env", "stage-0", "react"]
        },
        include: /retail\-ui/
      },
      {
        test: /\.less$/,
        loaders: [
          "classnames-loader",
          "style-loader",
          "css-loader",
          "less-loader"
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
    modules: ["node_modules", "web_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./source/index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    overlay: true,
    historyApiFallback: true
  }
};

module.exports = config;
