const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: ["babel-polyfill", "react-hot-loader/patch", "./src/app.js"],
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
            "flow",
            [
              "env",
              {
                modules: false
              }
            ],
            "stage-0",
            "react"
          ],
          plugins: ["react-hot-loader/babel"]
        },
        include: /src/
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
        include: /src|retail\-ui/
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
      template: "./src/index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};

module.exports = config;
