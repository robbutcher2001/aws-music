const path = require('path');
const webpack = require('webpack');
const htmlWebpack = require('html-webpack-plugin');
const faviconsWebpackPlugin = require('favicons-webpack-plugin');

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
    new faviconsWebpackPlugin({
      logo: path.resolve(__dirname, '../src/images/headphones.png'),
      title: 'Butcher | Music',
      persistentCache: false
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../src')
  }
};

module.exports = baseConfig;
