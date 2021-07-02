const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //默认webpack在dist文件夹不会生成html文件,这个插件就是为了在dist文件夹生成html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //默认webpack不会在再次build的时候清空dist文件夹，这个插件就是为了在每次build前删除旧文件
const { WebpackManifestPlugin } = require("webpack-manifest-plugin"); //生成manifest.json的插件
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[hash].js",
    path: path.resolve(__dirname, "dist"),
    // clean: true // webpack5
  },
  module: {
    rules: [
      {
        test: /(\.tsx)|(\.ts)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),//webpack 4需要，webpack5改成了clean选项
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
    new WebpackManifestPlugin(),
    new webpack.HotModuleReplacementPlugin() //开启热更新步骤1/2
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    contentBase: './dist',
    hot: true //开启热更新步骤2/2
  }
};
