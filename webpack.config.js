const path = require('path');
const htmlwebpack = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      use: [
        'babel-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // plugins: [
  //   new htmlwebpack({
  //     template: path.join(path.resolve(__dirname, 'src'), 'index.html'),
  //   }),
  // ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  }
};
