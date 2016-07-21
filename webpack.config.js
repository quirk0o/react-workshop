
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve('./app'),
  entry: './index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  })]
};