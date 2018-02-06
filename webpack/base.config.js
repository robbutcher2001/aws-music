const path = require('path');
const webpack = require('webpack');
const htmlWebpack = require('html-webpack-plugin');

const baseConfig = {
  entry: [
    './src/index.js',
    'whatwg-fetch'
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'app-bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new htmlWebpack({
      template: path.join(path.resolve(__dirname, '../src'), 'index.html'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../src')
  }
};

module.exports = baseConfig;
