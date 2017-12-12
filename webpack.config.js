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
  plugins: [
    new htmlwebpack({
      template: path.join(path.resolve(__dirname, 'dist'), 'index.html'),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
};
