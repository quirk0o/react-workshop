const path = require('path');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context:   path.resolve('./app'),
  entry:     [
    './index.js',
    'bootstrap-loader'
  ],
  output:    {
    path:     'dist',
    filename: 'bundle.js'
  },
  devtool:   'source-map',
  devServer: {
    port: 3000
  },
  module:    {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loader:  'babel',
        query:   {
          presets: ['es2015', 'react']
        }
      },
      {
        test:    /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test:    /\.scss$/,
        loaders: ['style', 'css', 'sass', 'postcss']
      },
      {
        test:   /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file'
      },
      { test: require.resolve("react"), loader: "expose?React" },
      { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" }
    ]
  },
  resolve:   {
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins:   [new HtmlWebpackPlugin({
    template: './index.html'
  })],
  postcss:   [autoprefixer]
};