var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname, 'server/static');
var APP_DIR = path.resolve(__dirname, 'client');

var config = {
  entry: [
    APP_DIR + '/index.jsx'
    ],
  output: {
    path: BUILD_DIR,
    filename: 'client.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
};

module.exports = config;