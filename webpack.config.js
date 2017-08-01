const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PROD = process.env.NODE_ENV === "production";

const config = {
  entry: ["babel-polyfill", "react-hot-loader/patch", "./src/app.js"],
  output: {
    // publicPath: "/",
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
          plugins: "react-hot-loader/babel"
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
        loader: PROD
          ? ExtractTextPlugin.extract(["css-loader", "less-loader"])
          : ["style-loader", "css-loader", "less-loader"],
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
    new ExtractTextPlugin("app.css"),
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
